import React from 'react';
import LazyAudio from '../components/LazyAudio';
import { filterAttributes } from '../components/HtmlToReactConverter';

export default {
  test: ({ tagName }) => tagName === 'audio',
  process: element => children => (
    <LazyAudio attributes={filterAttributes(element.attributes)}>
      {children}
    </LazyAudio>
  ),
};
