/* eslint no-bitwise: ["error", { "int32Hint": true }] */
import React from 'react';
import he from 'he';
import SlotInjector from '../components/SlotInjector';

const MIN_LIMIT_VALUE = 300;
const MIN_LENGTH = 100;
// const OFFSET = MIN_LIMIT_VALUE;

// TODO - change these to a functions that return the value?
const IMG_VALUE = 120;
const BLOCKQUOTE_VALUE = 120;
const LI_VALUE = 50;

const validElements = ['p', 'blockquote', 'ul', 'ol'];

// newChild: new element to be inserted
// refChild: child after which newChild it's going to be inserted
// children: array where newChild is going to be placed after refChild
const insertAfter = (newChild, refChild, children) => {
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

const injectSlots = ({ htmlTree, extraProps }) => {
  const { item, ...fillChildProps } = extraProps;
  const points = insertionPoints(htmlTree);

  let sum = 0;
  let position = 0;

  points.slice(0, points.length - 1).forEach(({ parent, child, value }) => {
    sum += value;

    if (sum >= MIN_LIMIT_VALUE) {
      position += 1;
      sum = 0;

      insertAfter(
        <SlotInjector
          key={`after ${MIN_LIMIT_VALUE * position} characters in content`}
          position={`after ${MIN_LIMIT_VALUE * position} characters in content`}
          item={item}
          fillChildProps={fillChildProps}
        />,
        child,
        parent.children,
      );
    }
  });
};

export default {
  test: (element, { htmlTree }) => element === htmlTree[0],
  process: (element, payload) => {
    injectSlots(payload);
    return element;
  },
};
