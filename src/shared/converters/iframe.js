import React from 'react';
import he from 'he';
import LazyIframe from '../components/LazyIframe';
import { filter } from '../components/HtmlToReactConverter/filter';

export default {
  test: ({ tagName, ignore }) => tagName === 'iframe' && !ignore,
  converter: element => {
    const { attributes } = element;

    let height;

    // Calculate height.
    if (attributes.height && attributes.width) {
      if (attributes.width.includes('%')) {
        height = `${attributes.height}px`;
      } else {
        height = `${100 * (attributes.height / attributes.width)}vw`;
      }
    } else {
      height = 'auto';
    }

    attributes.src = he.decode(attributes.src);

    const httpRegexp = /^http:\/\//;

    if (attributes.src.match(httpRegexp)) {
      attributes.src = attributes.src.replace(httpRegexp, 'https://');
    }

    return (
      <LazyIframe
        width="100%"
        height={height}
        attributes={filter(element.attributes)}
      />
    );
  },
};
