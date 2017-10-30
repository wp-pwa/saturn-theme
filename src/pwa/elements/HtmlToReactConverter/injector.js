/* eslint-disable no-restricted-syntax */
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
    let sum = 0;

    if (element.type === 'Text') {
      return he.decode(element.content.replace(/\s/g, '')).length;
    } else if (element.tagName === 'img' || element.tagName === 'iframe') {
      return IMG_VALUE;
    } else if (element.tagName === 'blockquote') {
      return BLOCKQUOTE_VALUE;
    } else if (element.tagName === 'li') {
      return LI_VALUE;
    } else if (element.children && element.children.length > 0) {
      for (const child of element.children) {
        let value = valueInsertions(child);
        sum += value;
        if (validElements.includes(child.tagName)) {
          if (value < MIN_LENGTH) {
            const whastePoint = points.pop();
            value += whastePoint ? whastePoint.value : 0;
          }
          points.push({ parent: element, child, value });
        }
      }
    }
    return sum;
  };

  let htmlRoot;
  if (htmlTree.length > 1) {
    htmlRoot = { children: htmlTree };
  } else if (htmlTree.length === 1) {
    htmlRoot = htmlTree[0];
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
  const limitValue = Math.max(
    MIN_LIMIT_VALUE,
    Math.floor(totalValue / toInject.length),
  );

  if (atTheBeginning) {
    htmlTree.unshift(toInject[index]);
    index += 1;
  }

  if (!atTheEnd) points = points.slice(0, -1);

  for (const point of points) {
    const { parent, child, value } = point;
    sum += value;
    if (sum >= limitValue) {
      const { children } = parent;
      insertAfter(toInject[index], child, children);
      index += 1;
      sum = 0;
    }
  }
}
