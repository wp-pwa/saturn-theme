import React from 'react';
import LazyTweet from '../components/LazyTweet';
import { getTweetId } from '../helpers';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'blockquote' &&
    attributes.className &&
    attributes.className.includes('twitter-tweet'),
  converter: element => {
    const { ...rest } = element
    const height = 'auto';
    const width = '100%';

    // Sets current element as its child
    element.children = [{ ...rest }];

    return children => (
      <LazyTweet
        width={width}
        height={height}
        offset={400}
        throttle={50}
        tweetId={getTweetId(element.children)}
      >
        {children}
      </LazyTweet>
    );
  },
};
