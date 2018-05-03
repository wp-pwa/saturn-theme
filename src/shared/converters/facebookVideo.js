import React from 'react';
import LazyFacebookVideo from '../components/LazyFacebookVideo';
import { elementHasClass } from '../helpers';

export default {
  test: element => element.tagName === 'div' && elementHasClass(element, 'fb-video'),
  converter: element => {
    const blockquote = element.children.find(child => child.tagName === 'blockquote');
    return children => (
      <LazyFacebookVideo href={blockquote.attributes.cite}>{children}</LazyFacebookVideo>
    );
  },
};
