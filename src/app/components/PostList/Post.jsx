/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { GridRow } from 'mcr-worona';
import IconShare from 'react-icons/lib/md/share';

import styles from './styles.css';

const Post = ({ id, title, author, media, type }) => {
  const images = media.media_details.sizes;
  const alt = media.alt_text;

  // Build srcset string for <img />
  const srcSet = Object.keys(images)
    .map(key => `${images[key].source_url} ${images[key].width}`)
    .reduce((total, current) => `${total}${current}w, `, '');

  return (
    <GridRow className={styles[`${type}Post`]}>
      <Link to={`?p=${id}`} className={styles[`${type}PostImage`]}>
        <img className={styles[`${type}PostImage`]} alt={alt} srcSet={srcSet} />
      </Link>
      <div className={styles[`${type}PostInfo`]}>
        <Link to={`?p=${id}`}>
          <p className={styles[`${type}PostTitle`]} dangerouslySetInnerHTML={{ __html: title }} />
        </Link>
        <Link to={`?author=${author.id}`}>
          <p className={styles[`${type}PostAuthor`]}>{author.name}</p>
        </Link>
      </div>
      <div className={styles[`${type}ShareButton`]}>
        <IconShare size={30} />
      </div>
    </GridRow>
  );
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  media: PropTypes.shape({}).isRequired,
  author: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
};

export default Post;
