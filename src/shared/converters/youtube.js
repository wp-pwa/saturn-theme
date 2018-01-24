import React from 'react';
import LazyYoutube from '../components/LazyYoutube';
import { filter } from '../components/HtmlToReactConverter/filter';

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

    const match =
      attributes.src.match(/\/embed\/([\d\w]+)/) || attributes.src.match(/\/([\w-]+?)\?/);

    const youtubeId = match ? match[1] : null;

    // Ignores iframe element in next conversions
    element.children[0].ignore = true;

    // Filters current attributes (removes 'autoplay' from allow prop)
    element.attributes = filter(element.attributes);

    return children => (
      <LazyYoutube
        key={`youtube${youtubeId}`}
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
