import React from 'react';
import LazyYoutube from '../components/LazyYoutube';

export default {
  test: ({ tagName, children }) =>
    (tagName === 'p' || tagName === 'div') &&
    children &&
    children[0] &&
    children[0].tagName === 'iframe' &&
    /youtube/.test(children[0].attributes.src),
  converter: element => {
    const { attributes } = element.children[0];

    let height;
    let width;

    if (attributes.height && attributes.width) {
      width = '100vw';
      height = `${(attributes.height * 100) / attributes.width}vw`; // prettier-ignore
    } else {
      height = '120px';
      width = '120px';
    }

    const youtubeId = attributes.src.match(/\/embed\/([\d\w]+)/)[1] || '';

    return children => (
      <LazyYoutube
        width={width}
        height={height}
        youtubeId={youtubeId}
        offset={400}
        throttle={50}
      >
        {children}
      </LazyYoutube>
    );
  }
};
