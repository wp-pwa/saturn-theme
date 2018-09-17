import LazyTweet from '../components/LazyTweet';
import { getTweetId } from '../helpers';

export default {
  test: ({ component, props, ignore }) =>
    component === 'blockquote' &&
    props.className &&
    (props.className.split(' ').includes('twitter-tweet') ||
      props.className.split(' ').includes('twitter-video')) &&
    !ignore,
  process: element => {
    const { ...rest } = element;
    const height = 'auto';
    const width = '100%';
    const tweetId = getTweetId(element.children);

    return {
      component: LazyTweet,
      props: { key: `tweet${tweetId}`, width, height, throttle: 50, tweetId },
      children: [{ ...rest, ignore: true }],
    };
  },
};
