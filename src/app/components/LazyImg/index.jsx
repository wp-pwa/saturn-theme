import React, { PropTypes } from 'react';
import LazyLoad from 'react-lazy-load';
import ImgIcon from 'react-icons/lib/fa/image';

import styles from './styles.css';

const LazyImg = ({
  width,
  height,
  imgProps,
  ...lazyLoadProps
 }) => {
  const { alt, ...restProps } = imgProps;
  const ratio = (height / width) * 100;
  return (
    <div
      className={!!ratio && styles.lazyImg}
      style={ratio ? { paddingTop: `${ratio}%` } : {}}
    >
      <div className={styles.icon}>
        <ImgIcon size={40} />
      </div>
      <LazyLoad {...lazyLoadProps}>
        <img alt={alt} {...restProps} data-lazy />
      </LazyLoad>
    </div>
  );
};

LazyImg.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  imgProps: PropTypes.shape({}),
};

export default LazyImg;
