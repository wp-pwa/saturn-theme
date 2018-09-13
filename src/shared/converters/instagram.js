import React from 'react';
import LazyInstagram from '../components/LazyInstagram';
import { getInstagramId } from '../helpers';

export default {
  test: ({ component, props, ignore }) =>
    component === 'blockquote' &&
    props.className &&
    props.className.split(' ').includes('instagram-media') &&
    !ignore,
  process: element => {
    const { props, ...rest } = element;
    const height = 'auto';
    const width = '100%';

    // Overrrides style props
    const style = {
      ...props.style,
      width: '500px',
      maxWidth: '100%',
      margin: '0 auto',
      boxSizing: 'border-box',
    };

    const newprops = Object.assign(props, { style });
    element.children = [{ ...rest, props: newprops, ignore: true }];

    const instagramId = getInstagramId(element.children);

    return children => (
      <LazyInstagram
        key={`instagram${instagramId}`}
        width={width}
        height={height}
        throttle={50}
        instagramId={instagramId}
      >
        {children}
      </LazyInstagram>
    );
  },
};
