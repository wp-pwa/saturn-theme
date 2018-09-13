import React from 'react';
import he from 'he';
import LazyIframe from '../components/LazyIframe';

export default {
  test: ({ component, ignore }) => component === 'iframe' && !ignore,
  process: element => {
    const { props } = element;

    let height;

    // Calculate height.
    if (props.height && props.width) {
      if (props.width.includes('%')) {
        height = `${props.height}px`;
      } else {
        height = `${100 * (props.height / props.width)}vw`;
      }
    } else {
      height = 'auto';
    }

    props.src = he.decode(props.src);

    const httpRegexp = /^http:\/\//;

    if (props.src.match(httpRegexp)) {
      props.src = props.src.replace(httpRegexp, 'https://');
    }

    return () => (
      <LazyIframe width="100%" height={height} props={element.props} />
    );
  },
};
