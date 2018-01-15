import React from 'react';
import LazyInstagram from '../components/LazyInstagram';
import { getInstagramId } from '../helpers';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'blockquote' &&
    attributes.className &&
    attributes.className.includes('instagram-media'),
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

    const newAttributes = Object.assign(attributes, { style });
    element.children = [{ ...rest, attributes: newAttributes }];

    return children => (
      <LazyInstagram
        width={width}
        height={height}
        offset={400}
        throttle={50}
        instagramId={getInstagramId(element.children)}
      >
        {children}
      </LazyInstagram>
    );
  }
};
