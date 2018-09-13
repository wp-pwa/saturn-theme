import React from 'react';
import LazyTweet from '../components/LazyTweet';
import { getTweetId } from '../helpers';

export default {
  test: ({ component, attributes, ignore }) =>
    component === 'blockquote' &&
    attributes.className &&
    (attributes.className.split(' ').includes('twitter-tweet') ||
      attributes.className.split(' ').includes('twitter-video')) &&
    !ignore,
  process: element => {
    const { ...rest } = element;
    const height = 'auto';
    const width = '100%';

    // Sets current element as its child
    element.children = [{ ...rest, ignore: true }];
    const tweetId = getTweetId(element.children);

    return children => (
      <LazyTweet
        key={`tweet${tweetId}`}
        width={width}
        height={height}
        throttle={50}
        tweetId={tweetId}
      >
        {children}
      </LazyTweet>
    );
  },
};
