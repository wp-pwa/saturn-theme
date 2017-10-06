import LazyInstagram from '../../elements/LazyInstagram';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'blockquote' &&
    attributes.className &&
    attributes.className.includes('instagram-media') &&
    !attributes['data-lazy'],
  converter: ({ attributes, ...rest }) => {
    const height = 'auto';
    const width = '100%';

    return {
      type: 'Element',
      tagName: LazyInstagram,
      attributes: {
        width,
        height,
        offset: 400,
        throttle: 50,
      },
      children: [{ ...rest, attributes: { ...attributes, 'data-lazy': true } }],
    };
  },
};
