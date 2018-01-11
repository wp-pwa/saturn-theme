import React from 'react';
import LazyTweet from '../../elements/LazyTweet';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'blockquote' &&
    attributes.className &&
    attributes.className.includes('twitter-tweet') &&
    !attributes['data-lazy'],
  converter: () => {
    const height = 'auto';
    const width = '100%';

    return children => (
      <LazyTweet
        width={width}
        height={height}
        offset={400}
        throttle={50}
      >
        {children}
      </LazyTweet>
    )
  },
};
