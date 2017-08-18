import he from 'he';

import Ad from '../Ad';

export const adsConfig = {
  postsBeforeAd: 3,
  atTheBeginning: true,
  atTheEnd: true,
  adList: [
    { siteId: 155418, pageId: 795173, formatId: 53557, width: 350, height: 60, target: '' },
    { siteId: 155418, pageId: 795173, formatId: 53284, width: 300, height: 600, target: '' },
    { siteId: 155418, pageId: 795173, formatId: 53439, width: 300, height: 250, target: '' },
    { siteId: 155418, pageId: 795173, formatId: 53440, width: 300, height: 600, target: '' },
    { siteId: 155418, pageId: 795173, formatId: 55103, width: 300, height: 600, target: '' },
    { siteId: 155418, pageId: 795173, formatId: 56926, width: 300, height: 300, target: '' },
    { siteId: 155418, pageId: 795173, formatId: 56927, width: 300, height: 300, target: '' },
    { siteId: 155418, pageId: 795173, formatId: 57312, width: 300, height: 300, target: '' },
    { siteId: 155418, pageId: 795173, formatId: 57313, width: 300, height: 300, target: '' },
  ],
};

const MIN_LIMIT_VALUE = 300;
const MIN_LENGTH = 133;
const OFFSET = MIN_LIMIT_VALUE;

const IMG_VALUE = 120;
const BLOCKQUOTE_VALUE = 120;
const LI_VALUE = 50;


const AD_ELEMENT = {
  type: 'Element',
  tagName: Ad,
  attributes: {},
  children: [],
};

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
  valueInsertions(htmlTree);
  return points;
};

export default json => {
  const { atTheBeginning, atTheEnd, adList } = adsConfig;

  let htmlTree = json;
  if (htmlTree.length > 1) {
    htmlTree = { children: htmlTree };
  } else {
    htmlTree = htmlTree[0];
  }

  let sum = !atTheBeginning ? OFFSET : 0;
  let index = 0;

  let points = insertionPoints(htmlTree);
  const totalValue = points.reduce((last, point) => last + point.value, 0);
  const limitValue = Math.max(MIN_LIMIT_VALUE, Math.floor(totalValue / adList.length));

  if (atTheBeginning) {
    htmlTree.children.unshift({ ...AD_ELEMENT, attributes: adList[index] || {} });
    index += 1;
  }

  if (!atTheEnd) points = points.slice(0, -1);

  for (const point of points) {
    const { parent, child, value } = point;
    sum += value;
    if (sum >= limitValue) {
      const { children } = parent;
      const ad = { ...AD_ELEMENT, attributes: adList[index] || {} };
      insertAfter(ad, child, children);
      sum = 0;
      index += 1;
    }
  }
};
