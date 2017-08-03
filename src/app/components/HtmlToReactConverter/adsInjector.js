import he from 'he';

import Ad from '../Ad';

const ADS = [
  { siteId: 155418, pageId: 795173, formatId: 53557, width: 350, height: 60, target: '' },
  { siteId: 155418, pageId: 795173, formatId: 53284, width: 300, height: 600, target: '' },
  { siteId: 155418, pageId: 795173, formatId: 53439, width: 300, height: 250, target: '' },
  { siteId: 155418, pageId: 795173, formatId: 53440, width: 300, height: 600, target: '' },
  { siteId: 155418, pageId: 795173, formatId: 55103, width: 300, height: 300, target: '' },
  { siteId: 155418, pageId: 795173, formatId: 56926, width: 300, height: 300, target: '' },
  { siteId: 155418, pageId: 795173, formatId: 56927, width: 300, height: 300, target: '' },
  { siteId: 155418, pageId: 795173, formatId: 57312, width: 300, height: 300, target: '' },
  { siteId: 155418, pageId: 795173, formatId: 57313, width: 300, height: 300, target: '' },
];

const MIN_LIMIT_VALUE = 300;
const IMG_VALUE = 120;
const MIN_LENGTH = 133;
const OFFSET = MIN_LIMIT_VALUE;

const ROOT_DIV = { type: 'Element', tagName: 'div', attributes: {} };

const SAMPLE_AD = {
  type: 'Element',
  tagName: Ad,
  attributes: {},
  children: [],
};

const validElements = ['p', 'blockquote', 'ul', 'ol'];

const insertAfter = (newChild, refChild, children) => {
  children.splice(children.indexOf(refChild) + 1, 0, newChild);
};

const insertionPoints = htmlTree => {
  const points = [];
  const valueInsertions = element => {
    let sum = 0;

    if (element.type === 'Text') {
      // returns value directly
      return he.decode(element.content.replace(/\s/g, '')).length;
      // FU
    } else if (element.tagName === 'img' || element.tagName === 'iframe') {
      return IMG_VALUE;
      // FU
    } else if (element.tagName === 'blockquote') {
      return 200;
    } else if (element.tagName === 'li') {
      return 50;
    } else if (element.children && element.children.length > 0) {
      for (const child of element.children) {
        let value = valueInsertions(child);
        sum += value;
        if (validElements.includes(child.tagName)) {
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
  // console.log('ROOT', htmlTree);
  let sum = OFFSET;
  let index = 0;
  const points = insertionPoints(htmlTree);
  const totalValue = points.reduce((last, point) => last + point.value, 0);
  const limitValue = Math.max(MIN_LIMIT_VALUE, Math.floor(totalValue / ADS.length));
  // console.log(limitValue);
  for (const point of points.slice(0, -1)) {
    const { parent, child, value } = point;
    sum += value;
    if (sum >= limitValue) {
      // console.log('YES', sum, index);
      const { children } = parent;
      const ad = { ...SAMPLE_AD, attributes: ADS[index] || {} };
      insertAfter(ad, child, children);
      sum = 0;
      index += 1;
    } else {
      // console.log('NO ', sum);
    }
  }
};
