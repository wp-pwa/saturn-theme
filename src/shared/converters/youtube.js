import React from 'react';
import LazyYoutube from '../components/LazyYoutube';
import { filter } from '../components/HtmlToReactConverter/filter';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'iframe' &&
    (/youtube/.test(attributes.src) ||
      (attributes.dataset && /youtube/.test(attributes.dataset.src))),
  process: element => {
    const { attributes } = element;

    let height;

    if (attributes.height && attributes.width) {
      height = `${(attributes.height / attributes.width) * 100}vw`;
    } else {
      height = '120px';
    }

    if (!attributes.src) attributes.src = attributes.dataset.src;

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
        attributes={filter(element.attributes)}
      />
    );
  },
};
