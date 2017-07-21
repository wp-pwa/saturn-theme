import React, { PropTypes } from 'react';
import LazyLoad from 'react-lazy-load';

const LazyImg = ({ height, once, offset, overflow, imgProps }) => {
  const { alt, ...restProps } = imgProps;
  return (
    <LazyLoad height={height} once={once} offset={offset} overflow={overflow}>
      <img alt={alt} {...restProps} />
    </LazyLoad>
  );
};

LazyImg.propTypes = {
  height: PropTypes.string,
  once: PropTypes.bool,
  offset: PropTypes.number,
  overflow: PropTypes.bool,
  imgProps: PropTypes.shape({}),
};

export default LazyImg;
