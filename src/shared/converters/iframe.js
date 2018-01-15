import LazyLoad from 'react-lazy-load';

export default {
  test: ({ tagName, attributes, children }) =>
    tagName === 'p' && children[0].tagName === 'iframe' && !attributes['data-lazy'],
  converter: ({ children }) => {
    const { attributes, ...rest } = children[0];

    return {
      type: 'Element',
      tagName: LazyLoad,
      attributes: {
        offset: 400,
        throttle: 50
      },
      children: [{ ...rest, attributes: { ...attributes, 'data-lazy': true } }]
    };
  }
};
