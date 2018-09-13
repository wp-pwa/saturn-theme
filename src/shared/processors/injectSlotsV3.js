/* eslint no-bitwise: ["error", { "int32Hint": true }] */
import React from 'react';
import he from 'he';
import SlotInjector from '../components/SlotInjector';

const MIN_LIMIT_VALUE = 300;

const IMG_VALUE = 120;
// const BLOCKQUOTE_VALUE = 120;
// const LI_VALUE = 50;

const targetElements = [
  'p',
  'blockquote',
  'ul',
  'ol',
  'div',
  'img',
  'figure',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'h7',
];

// newChild: new element to be inserted
// refChild: child after which newChild it's going to be inserted
// children: array where newChild is going to be placed after refChild
const insertAfter = (newChild, refChild, children) => {
  children.splice(children.indexOf(refChild) + 1, 0, newChild);
};

const countText = element => {
  if (element.type === 'text') {
    return he.decode(element.content.replace(/\s/g, '')).length;
  }
  if (element.tagName === 'img' || element.tagName === 'iframe') {
    return IMG_VALUE;
  }
  // if (element.tagName === 'blockquote') {
  //   return BLOCKQUOTE_VALUE;
  // }
  // if (element.tagName === 'li') {
  //   return LI_VALUE;
  // }
  return 0;
};

let sum = 0;
let position = 0;

export default {
  test: () => true,
  process: (element, { parent, extraProps, htmlTree }) => {
    // Reinit counts if it is the first element
    if (element === htmlTree[0]) {
      console.log('init');
      sum = 0;
      position = 0;
    }

    let toReturn = element;

    if (sum > MIN_LIMIT_VALUE && targetElements.includes(element.tagName)) {
      sum = 0;
      position += 1;

      const { item, ...fillChildProps } = extraProps;

      console.log(element, parent, parent.children);

      insertAfter(element, element, parent.children);

      toReturn = (
        <SlotInjector
          key={`after ${MIN_LIMIT_VALUE * position} characters in content`}
          position={`after ${MIN_LIMIT_VALUE * position} characters in content`}
          item={item}
          fillChildProps={fillChildProps}
        />
      );
    }

    sum += countText(element);
    console.log('sum', sum);

    return toReturn;
  },
};
