/* eslint no-bitwise: ["error", { "int32Hint": true }] */
import he from 'he';

const MIN_LIMIT_VALUE = 300;
const MIN_LENGTH = 133;
const OFFSET = MIN_LIMIT_VALUE;

const IMG_VALUE = 120;
const BLOCKQUOTE_VALUE = 120;
const LI_VALUE = 50;

const validElements = ['p', 'blockquote', 'ul', 'ol'];

const insertAfter = (newChild, refChild, children) => {
  if (!newChild) return;
  children.splice(children.indexOf(refChild) + 1, 0, newChild);
};

const insertionPoints = htmlTree => {
  const points = [];
  const valueInsertions = element => {
    if (element.type === 'Text') {
      return he.decode(element.content.replace(/\s/g, '')).length;
    } else if (element.tagName === 'img' || element.tagName === 'iframe') {
      return IMG_VALUE;
    } else if (element.tagName === 'blockquote') {
      return BLOCKQUOTE_VALUE;
    } else if (element.tagName === 'li') {
      return LI_VALUE;
    } else if (element.children && element.children.length > 0) {
      return element.children.reduce((sum, child) => {
        let value = valueInsertions(child);
        const newSum = sum + value;
        if (validElements.includes(child.tagName)) {
          if (value < MIN_LENGTH) {
            const whastePoint = points.pop();
            value += whastePoint ? whastePoint.value : 0;
          }
          points.push({ parent: element, child, value });
        }
        return newSum;
      }, 0);
    }

    return 0;
  };

  let htmlRoot;
  if (htmlTree.length > 1) {
    htmlRoot = { children: htmlTree };
  } else if (htmlTree.length === 1) {
    [htmlRoot] = htmlTree;
  } else {
    return points;
  }

  valueInsertions(htmlRoot);
  return points;
};

// carousels is an object
export default function injector({ htmlTree, toInject, atTheBeginning, atTheEnd }) {
  // const { atTheBeginning, atTheEnd, adList } = adsConfig;

  let sum = !atTheBeginning ? OFFSET : 0;
  let index = 0;

  let points = insertionPoints(htmlTree);
  const totalValue = points.reduce((last, point) => last + point.value, 0);
  const limitValue = Math.max(MIN_LIMIT_VALUE, Math.floor(totalValue / (toInject.length + 1)));

  if (atTheBeginning) {
    // converts boolean values to integer
    const n = atTheBeginning|0;
    // inserts the first 'n' elements from 'toInject' at the beginning
    htmlTree.splice(0, 0, ...toInject.slice(0, n).map(o => o.element));
    index += n;
  }

  if (!atTheEnd) points = points.slice(0, -1);

  points.forEach((point, pointIndex) => {
    const { parent, child, value } = point;
    sum += value;
    if (sum >= limitValue) {
      const isLastPosition = pointIndex === points.length - 1;
      const { children } = parent;
      if (isLastPosition) {
        // Finds the first element that can be injected at the end
        const injectable = toInject.slice(index).find(e => !e.doNotPlaceAtTheEnd);
        if (injectable) insertAfter(injectable.element, child, children);
      } else {
        const injectable = toInject[index];
        if (injectable) insertAfter(injectable.element, child, children);
        index += 1;
        sum = 0;
      }
    }
  });
}
