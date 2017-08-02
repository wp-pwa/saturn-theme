import React, { PropTypes } from 'react';
import LazyLoad from 'react-lazy-load';
import ImgIcon from 'react-icons/lib/fa/image';
import he from 'he';

import styles from './styles.css';

const LazyImg = ({
  width,
  height,
  imgProps,
  ...lazyLoadProps
 }) => {
  const { alt, src, srcSet, ...restProps } = imgProps;
  const ratio = (height / width) * 100;
  const newProps = { ...restProps };
  if (src) newProps.src = he.decode(src);
  if (srcSet) newProps.srcSet = he.decode(srcSet);
  return (
    <div
      className={`${styles.lazyImg} ${ratio ? styles.withRatio : ''}`}
      style={ratio ? { paddingTop: `${ratio}%` } : {}}
    >
      <div className={styles.icon}>
        <ImgIcon size={40} />
      </div>
      <LazyLoad {...lazyLoadProps}>
        <img
          data-lazy
          alt={alt}
          {...newProps}
        />
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
