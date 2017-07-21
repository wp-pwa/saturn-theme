import LazyLoad from 'react-lazyload';

export default {
  test: element => element.tagName === 'img' && !element.attributes['data-lazy'],
  converter: element => {
    const { attributes, ...rest } = element;
    return {
      type: 'Element',
      tagName: LazyLoad,
      // tagName: 'div',
      attributes: {
        height: '180px',
        offset: 9999,
        once: true,
        overflow: true,
      },
      children: [{
        ...rest,
        attributes: {
          ...attributes,
          'data-lazy': true,
        },
      }],
    };
  },
};
