import LazyInstagram from '../components/LazyInstagram';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'blockquote' &&
    attributes.className &&
    attributes.className.includes('instagram-media') &&
    !attributes['data-lazy'],
  converter: ({ attributes, ...rest }) => {
    const height = 'auto';
    const width = '100%';

    // Overrrides style attributes
    const style = { ...attributes.style };
    style.width = '500px';
    style.maxWidth = '100%';
    style.margin = '0 auto';
    style.boxSizing = 'border-box';

    const newAttributes = Object.assign(attributes, { style, 'data-lazy': true });

    return {
      type: 'Element',
      tagName: LazyInstagram,
      attributes: {
        width,
        height,
        offset: 400,
        throttle: 50,
      },
      children: [{ ...rest, attributes: newAttributes }],
    };
  },
};
