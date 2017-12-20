import LazyTweet from '../../elements/LazyTweet';
import { filter } from '../../elements/HtmlToReactConverter/filter';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'blockquote' &&
    attributes.className &&
    attributes.className.includes('twitter-tweet') &&
    !attributes['data-lazy'],
  converter: ({ attributes, ...rest }) => {
    const height = 'auto';
    const width = '100%';

    return {
      type: 'Element',
      tagName: LazyTweet,
      attributes: {
        width,
        height,
        offset: 400,
        throttle: 50,
        imgProps: filter(attributes),
      },
      children: [{ ...rest, attributes: { ...attributes, 'data-lazy': true } }],
    };
  },
};
