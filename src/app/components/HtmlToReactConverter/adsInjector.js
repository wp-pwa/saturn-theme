import { unescape } from 'lodash';

const IMG_VALUE = 100;
const LIMIT_VALUE = 300;
const MIN_LENGTH = 110;
const OFFSET = LIMIT_VALUE;

const ROOT_DIV = { type: 'Element', tagName: 'div', attributes: {} };

const SAMPLE_AD_TEXT = {
  type: 'Element',
  tagName: 'div',
  attributes: {
    style: { fontSize: '48px', color: 'white', fontWeight: 'bold' },
  },
  children: [{ type: 'Text', content: 'AD' }],
};

const SAMPLE_AD = {
  type: 'Element',
  tagName: 'div',
  attributes: {
    style: {
      background: 'LIGHTSTEELBLUE',
      width: '100%',
      height: '500px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  children: [SAMPLE_AD_TEXT],
};

const RED_LINE = {
  type: 'Element',
  tagName: 'div',
  attributes: { style: { background: 'RED', width: '100%', height: '2px' } },
  children: [],
};

const insertAfter = (newChild, refChild, children) => {
  children.splice(children.indexOf(refChild) + 1, 0, newChild);
};

const insertionPoints = htmlTree => {
  const points = [];
  const valueInsertions = element => {
    let sum = 0;

    if (element.type === 'Text') {
      // returns value directly
      return unescape(element.content.replace(/\s/g, '')).length;
      // FU
    } else if (element.tagName === 'img' || element.tagName === 'iframe') {
      return IMG_VALUE;
      // FU
    } else if (element.children && element.children.length > 0) {
      for (const child of element.children) {
        let value = valueInsertions(child);
        sum += value;
        if (child.tagName === 'p') {
          if (value < MIN_LENGTH) value += points.pop().value;
          points.push({ parent: element, child, value });
        }
      }
    }
    return sum;
  };
  valueInsertions(htmlTree);
  return points;
};

export default json => {
  let htmlTree = json;
  if (htmlTree.length > 1) {
    htmlTree = { ...ROOT_DIV, children: htmlTree };
  } else {
    htmlTree = htmlTree[0];
  }
  console.log('ROOT', htmlTree);
  let sum = OFFSET;
  const points = insertionPoints(htmlTree);
  for (const point of points.slice(0, -1)) {
    const { parent, child, value } = point;
    sum += value;
    if (sum >= LIMIT_VALUE) {
      console.log('YES', sum);
      const { children } = parent;
      insertAfter(SAMPLE_AD, child, children);
      sum = 0;
    } else {
      console.log('NO ', sum);
    }
    const { children } = parent;
    insertAfter(RED_LINE, child, children);
  }
};
