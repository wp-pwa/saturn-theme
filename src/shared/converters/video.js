import React from 'react';
import LazyVideo from '../components/LazyVideo';
import { filter } from '../components/HtmlToReactConverter/filter';

export default {
  test: ({ tagName, attributes, ignore }) => {
    /* Cases tested:
      1:
        <video />
      2:
        <div class='wp-video'>
          <video />
        </div>
    */

    // Returns false if it's already converted.
    if (ignore) return false;

    // Returns true if it's a <video>.
    if (tagName === 'video') return true;

    // Returns true if it's a <div> with class 'wp-video'.
    if (
      tagName === 'div' &&
      attributes &&
      attributes.className &&
      attributes.className.includes('wp-video')
    ) {
      return true;
    }

    return false;
  },
  converter: element => {
    const { tagName } = element;

    let height;
    let width;
    let attributes;
    let newChildren;

    if (tagName === 'video') {
      ({ attributes } = element);
      ({ children: newChildren } = element);
    } else if (tagName === 'div') {
      const child = element.children.find(c => c.tagName === 'video');
      ({ attributes } = child);
      newChildren = child.children.filter(c => c.tagName === 'source');
    }

    if (attributes.height && attributes.width) {
      width = '100vw';
      height = `${(attributes.height * 100) / attributes.width}vw`; // prettier-ignore
    } else {
      height = '120px';
      width = '120px';
    }

    // Replaces children
    element.children = newChildren;
    newChildren.forEach(child => {
      child.ignore = true;
    });

    return children => (
      <LazyVideo
        width={width}
        height={height}
        offset={400}
        throttle={50}
        videoProps={filter(attributes) || {}}
      >
        {children}
      </LazyVideo>
    );
  },
};
