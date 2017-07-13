/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import IconShare from 'react-icons/lib/md/share';

import * as actions from '../../actions';

import styles from './styles.css';

const PostItem = ({ id, title, author, media, type, sharePost }) => {
  let alt;
  let images;
  let srcSet;

  if (media) {
    alt = media.alt_text;
    // Build srcset string for <img />
    images = media.media_details.sizes;
    srcSet = Object.keys(images)
      .map(key => `${images[key].source_url} ${images[key].width}`)
      .reduce((total, current) => `${total}${current}w, `, '');
  }

  return (
    <div className={styles[`${type}Post`]}>
      <Link to={`?p=${id}`}>
        {media && <img className={styles[`${type}PostImage`]} alt={alt} srcSet={srcSet} />}
        <div className={styles[`${type}PostInfo`]}>
          <p className={styles[`${type}PostTitle`]} dangerouslySetInnerHTML={{ __html: title }} />
          <Link to={`?author=${author.id}`}>
            <p className={styles[`${type}PostAuthor`]}>
              {author.name}
            </p>
          </Link>
        </div>
      </Link>
      <button className={styles[`${type}ShareButton`]} onClick={() => sharePost(id, 'posts')}>
        <IconShare size={30} />
      </button>
    </div>
  );
};

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  media: PropTypes.shape({}),
  author: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  sharePost: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  sharePost: (id, wpType) => {
    dispatch(actions.share.openModal({ id, wpType }));
    dispatch(actions.share.requestCount({ id, wpType }));
  },
});

export default connect(null, mapDispatchToProps)(PostItem);
