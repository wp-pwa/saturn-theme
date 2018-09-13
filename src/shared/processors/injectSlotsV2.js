/* eslint no-bitwise: ["error", { "int32Hint": true }] */
import React from 'react';
import he from 'he';
import SlotInjector from '../components/SlotInjector';

const MIN_LIMIT_VALUE = 300;

const IMG_VALUE = 120;
const BLOCKQUOTE_VALUE = 120;
const LI_VALUE = 50;

const targetElements = ['p', 'blockquote', 'ul', 'ol', 'div', 'img', 'figure'];

// newChild: new element to be inserted
// refChild: child after which newChild it's going to be inserted
// children: array where newChild is going to be placed after refChild
const insertAfter = (newChild, refChild, children) => {
  children.splice(children.indexOf(refChild) + 1, 0, newChild);
};

const countText = element => {
  if (element.type === 'text') {
    return he.decode(element.content.replace(/\s/g, '')).length;
  } else if (element.component === 'img' || element.component === 'iframe') {
    return IMG_VALUE;
  } else if (element.component === 'blockquote') {
    return BLOCKQUOTE_VALUE;
  } else if (element.component === 'li') {
    return LI_VALUE;
  } else if (element.children && element.children.length > 0) {
    return element.children.reduce((sum, child) => sum + countText(child), 0);
  }
  return 0;
};

let sum = 0;
let position = 0;

export default {
  test: ({ component }) => component && targetElements.includes(component),
  process: (element, { parent, extraProps, htmlTree }) => {
    // Reinit counts if it is the first element
    if (element === htmlTree[0]) {
      sum = 0;
      position = 0;
    }

    sum += countText(element);

    if (sum > MIN_LIMIT_VALUE) {
      sum = 0;
      position += 1;

      const { item, ...fillChildProps } = extraProps;

      console.log(element, parent, parent.children);

      insertAfter(
        <SlotInjector
          key={`after ${MIN_LIMIT_VALUE * position} characters in content`}
          position={`after ${MIN_LIMIT_VALUE * position} characters in content`}
          item={item}
          fillChildProps={fillChildProps}
        />,
        element,
        parent.children,
      );
    }

    return element;
  },
};
