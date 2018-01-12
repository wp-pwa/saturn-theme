import LazyInstagram from '../components/LazyInstagram';
import { getInstagramId } from '../helpers';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'blockquote' &&
    attributes.className &&
    attributes.className.includes('instagram-media') &&
    !attributes['data-lazy'],
  converter: element => {
    const { attributes, ...rest } = element;
    const height = 'auto';
    const width = '100%';

    // Overrrides style attributes
    const style = {
      ...attributes.style,
      width: '500px',
      maxWidth: '100%',
      margin: '0 auto',
      boxSizing: 'border-box'
    };

    const newAttributes = Object.assign(attributes, { style, 'data-lazy': true });

    return {
      type: 'Element',
      tagName: LazyInstagram,
      attributes: {
        width,
        height,
        offset: 400,
        throttle: 50,
        instagramId: getInstagramId(element.children)
      },
      children: [{ ...rest, attributes: newAttributes }]
    };
  }
};
