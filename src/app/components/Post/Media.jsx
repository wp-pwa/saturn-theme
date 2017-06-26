import React, { PropTypes } from 'react';

import styles from './styles.css';

const Media = ({ media }) => {
  const images = media.media_details.sizes;
  const alt = media.alt_text;

  // Build srcset string for <img />
  const srcSet = Object.keys(images)
    .map(key => `${images[key].source_url} ${images[key].width}`)
    .reduce((total, current) => `${total}${current}w, `, '');

  return (
    <div className={styles.postMedia}>
      <img alt={alt} srcSet={srcSet} />
    </div>
  );
};

Media.propTypes = {
  media: PropTypes.shape({}),
};

export default Media;
