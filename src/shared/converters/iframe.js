import React from 'react';
import LazyLoad from 'react-lazy-load';

export default {
  test: ({ tagName, children }) =>
    tagName === 'p' && children[0].tagName === 'iframe',
  converter: () => children => (
    <LazyLoad offset={400} throttle={50}>
      {children}
    </LazyLoad>
  ),
};
