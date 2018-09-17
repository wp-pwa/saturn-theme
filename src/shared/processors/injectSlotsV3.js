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

// // newChild: new element to be inserted
// // refChild: child after which newChild it's going to be inserted
// // children: array where newChild is going to be placed after refChild
// const insertAfter = (newChild, refChild, children) => {
//   children.splice(children.indexOf(refChild) + 1, 0, newChild);
// };

const countText = element => {
  if (element.type === 'text') {
    return he.decode(element.content.replace(/\s/g, '')).length;
  }
  if (element.component === 'img' || element.component === 'iframe') {
    return IMG_VALUE;
  }
  return 0;
};

const hasReactAncestor = ({ component, parent }) => {
  const value =
    !!parent &&
    (typeof parent.component === 'function' || hasReactAncestor(parent));

  console.log(component, 'hasReactAncestor', value);
  return value;
};

let sum = 0;
let positionNum = 0;

export default {
  test: () => true,
  process: (element, { extraProps, htmlTree }) => {
    // Reinit counts if it is the first element
    if (element === htmlTree[0]) {
      console.log('init');
      sum = 0;
      positionNum = 0;
    }

    if (
      sum > MIN_LIMIT_VALUE &&
      targetElements.includes(element.component) &&
      !hasReactAncestor(element)
    ) {
      sum = 0;
      positionNum += 1;

      const { item, ...fillChildProps } = extraProps;
      const { parent } = element;
      const children = parent ? parent.children : htmlTree;

      const position = `after ${MIN_LIMIT_VALUE *
        positionNum} characters in content`;

      console.log(element, position);

      // duplicate element
      children.splice(children.indexOf(element) + 1, 0, { ...element });

      // slot that replaces current element
      return {
        component: SlotInjector,
        props: {
          key: position,
          position,
          item,
          fillChildProps,
        },
        children: null,
      };
    }

    sum += countText(element);
    console.log('sum', sum);

    return element;
  },
};
