import React from 'react';
import LazyVideo from '../components/LazyVideo';

export default {
  test: ({ component }) => component === 'video',
  process: element => {
    const { props } = element;

    let height;

    if (props.height && props.width) {
      height = `${(props.height * 100) / props.width}vw`; // prettier-ignore
    } else {
      height = '120px';
    }

    return children => (
      <LazyVideo width="100vw" height={height} throttle={50} props={props}>
        {children}
      </LazyVideo>
    );
  },
};
