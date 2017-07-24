import { filter } from '../../HtmlToReactConverter/filter';

import LazyImg from '../../LazyImg';

export default {
  test: element => element.tagName === 'img' && !element.attributes['data-lazy'],
  converter: element => {
    const { attributes } = element;
    return {
      type: 'Element',
      tagName: LazyImg,
      attributes: {
        width: attributes.width,
        height: attributes.height,
        offset: 300,
        throttle: 50,
        debounce: false,
        imgProps: filter(attributes),
      },
    };
  },
};
