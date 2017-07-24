import LazyLoad from 'react-lazy-load';

import { filter } from '../../HtmlToReactConverter/filter';

const lazyElements = [
  'img',
  'video',
  'iframe',
];

export default {
  test: element => lazyElements.includes(element.tagName) && !element.attributes['data-lazy'],
  converter: element => {
    const { attributes, ...rest } = element;
    return {
      type: 'Element',
      tagName: LazyLoad,
      attributes: {
        offset: 400,
        throttle: 50,
        imgProps: filter(attributes),
      },
      children: [{ ...rest, attributes: { ...attributes, 'data-lazy': true } }],
    };
  },
};
