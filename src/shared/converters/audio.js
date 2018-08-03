import React from 'react';
import LazyAudio from '../components/LazyAudio';
import { filter } from '../components/HtmlToReactConverter/filter';

export default {
  test: ({ tagName }) => tagName === 'audio',
  converter: element => children => (
    <LazyAudio attributes={filter(element.attributes)}>{children}</LazyAudio>
  ),
};
