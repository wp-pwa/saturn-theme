/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';
import { GridRow } from 'mcr-worona';
import IconShare from 'react-icons/lib/md/share';

import styles from './styles.css';

const Post = ({ title, media, author, type }) => {
  const images = media.media_details.sizes;
  const alt = media.alt_text;

  // Build srcset string for <img />
  const srcSet = Object.keys(images)
    .map(key => `${images[key].source_url} ${images[key].width}`)
    .reduce((total, current) => `${total}${current}w, `, '');

  return (
    <GridRow className={styles[`${type}Post`]}>
      <img className={styles[`${type}PostImage`]} alt={alt} srcSet={srcSet} />
      <div className={styles[`${type}PostInfo`]}>
        <p className={styles[`${type}PostTitle`]} dangerouslySetInnerHTML={{ __html: title }} />
        <p className={styles[`${type}PostAuthor`]}>{author}</p>
      </div>
      <div className={styles[`${type}ShareButton`]}>
        <IconShare size={30} />
      </div>
    </GridRow>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  media: PropTypes.shape({}).isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Post;
