import React from 'react';
import LazySoundcloud from '../components/LazySoundcloud';
import { filter } from '../components/HtmlToReactConverter/filter';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'iframe' && attributes.src.includes('soundcloud'),
  process: element => {
    const { attributes } = element;

    let height;

    if (attributes.height && attributes.width) {
      if (attributes.width.includes('%')) {
        height = `${attributes.height}px`;
      } else {
        height = `${(attributes.height * 100) / attributes.width}vw`; // prettier-ignore
      }
    } else {
      height = '120px';
    }

    const httpRegexp = /^http:\/\//;

    if (attributes.src.match(httpRegexp)) {
      attributes.src = attributes.src.replace(httpRegexp, 'https://');
    }

    const [, track, color] = /tracks\/(\d+).+color=%(\w{6})/g.exec(
      attributes.src,
    );

    return (
      <LazySoundcloud
        height={height}
        width="100%"
        track={track}
        color={color}
        attributes={filter(attributes)}
      />
    );
  },
};
