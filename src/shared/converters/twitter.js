import LazyTweet from '../components/LazyTweet';
import { getTweetId } from '../helpers';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'blockquote' &&
    attributes.className &&
    attributes.className.includes('twitter-tweet') &&
    !attributes['data-lazy'],
  converter: element => {
    const { attributes } = element;
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
        tweetId: getTweetId(element.children)
      },
      children: [{ ...element, attributes: { ...attributes, 'data-lazy': true } }]
    };
  }
};
