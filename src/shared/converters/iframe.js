import React from 'react';
import LazyLoad from 'react-lazy-load';

export default {
  test: ({ tagName, children, ignore }) =>
    tagName === 'p' && children[0].tagName === 'iframe' && !ignore,
  converter: element => {
    element.children.forEach(child => {
      child.ignore = true;
    });

    return children => (
      <LazyLoad offsetVertical={400} offsetHorizontal={-10} throttle={50}>
        {children}
      </LazyLoad>
    );
  },
};
