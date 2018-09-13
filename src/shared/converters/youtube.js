import React from 'react';
import LazyYoutube from '../components/LazyYoutube';

export default {
  test: ({ component, attributes }) =>
    component === 'iframe' &&
    (/youtube/.test(attributes.src) || /youtube/.test(attributes['data-src'])),
  process: element => {
    const { attributes } = element;

    let height;

    if (attributes.height && attributes.width) {
      height = `${(attributes.height / attributes.width) * 100}vw`;
    } else {
      height = '120px';
    }

    if (!attributes.src) attributes.src = attributes['data-src'];

    const match =
      attributes.src.match(/\/embed\/([\d\w-]+)/) ||
      attributes.src.match(/\/([\d\w-]+?)\?/);

    const youtubeId = match ? match[1] : null;

    return (
      <LazyYoutube
        key={`youtube${youtubeId}`}
        width="100vw"
        height={height}
        youtubeId={youtubeId}
        attributes={element.attributes}
      />
    );
  },
};
