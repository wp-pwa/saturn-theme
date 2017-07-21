import { filter } from '../../HtmlToReactConverter/filter';

import LazyImg from './LazyImg';

export default {
  test: element => element.tagName === 'img',
  converter: element => {
    const { attributes } = element;
    return {
      type: 'Element',
      tagName: LazyImg,
      attributes: {
        offset: 1000,
        imgProps: filter(attributes),
      },
      children: [],
    };
  },
};
