import { unescape } from 'lodash';

import Ad from '../Ad';

const IDS = [53557, 53284, 53439, 53440, 55103, 56926, 56927, 57312, 57313];

const ADS = [
  { siteId: 150207, pageId: 779165, formatId: 53557, width: 300, height: 300, target: '' },
  { siteId: 150207, pageId: 779165, formatId: 53284, width: 300, height: 300, target: '' },
  { siteId: 150207, pageId: 779165, formatId: 53439, width: 300, height: 250, target: '' },
  { siteId: 150207, pageId: 779165, formatId: 53440, width: 300, height: 600, target: '' },
  { siteId: 150207, pageId: 779165, formatId: 55103, width: 300, height: 300, target: '' },
  { siteId: 150207, pageId: 779165, formatId: 56926, width: 300, height: 300, target: '' },
  { siteId: 150207, pageId: 779165, formatId: 56927, width: 300, height: 300, target: '' },
  { siteId: 150207, pageId: 779165, formatId: 57312, width: 300, height: 300, target: '' },
  { siteId: 150207, pageId: 779165, formatId: 57313, width: 300, height: 300, target: '' },
];

const IMG_VALUE = 100;
const LIMIT_VALUE = 300;
const MIN_LENGTH = 110;
const OFFSET = LIMIT_VALUE;

const ROOT_DIV = { type: 'Element', tagName: 'div', attributes: {} };

const SAMPLE_AD = {
  type: 'Element',
  tagName: Ad,
  attributes: {},
  children: [],
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
  let index = 0;
  for (const point of insertionPoints(htmlTree).slice(0, -1)) {
    const { parent, child, value } = point;
    sum += value;
    if (sum >= LIMIT_VALUE) {
      console.log('YES', sum, index);
      const { children } = parent;
      const ad = {
        ...SAMPLE_AD,
        attributes: ADS[index],
      };
      insertAfter(ad, child, children);
      sum = 0;
      index += 1;
    } else {
      console.log('NO ', sum);
    }
    const { children } = parent;
    insertAfter(RED_LINE, child, children);
  }
};
