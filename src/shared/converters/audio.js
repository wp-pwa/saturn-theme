import React from 'react';
import LazyAudio from '../components/LazyAudio';

export default {
  test: ({ component }) => component === 'audio',
  process: element => children => (
    <LazyAudio attributes={element.attributes}>{children}</LazyAudio>
  ),
};
