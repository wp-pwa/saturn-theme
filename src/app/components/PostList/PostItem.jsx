/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import IconShare from 'react-icons/lib/md/share';

import Media from '../Media';

import * as actions from '../../actions';

import styles from './styles.css';

const PostItem = ({ id, title, author, media, type, sharePost }) =>
  <div className={styles[`${type}Post`]}>
    <Link to={`?p=${id}`}>
      {media && <Media media={media} className={styles[`${type}PostImage`]} />}
      <div className={styles[`${type}PostInfo`]}>
        <p className={styles[`${type}PostTitle`]} dangerouslySetInnerHTML={{ __html: title }} />
        <Link to={`?author=${author.id}`}>
          <p className={styles[`${type}PostAuthor`]}>
            {author.name}
          </p>
        </Link>
      </div>
    </Link>
    <div className={styles[`${type}ShareButton`]}>
      <IconShare size={27} onClick={() => sharePost(id, 'posts')} />
    </div>
  </div>;

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  media: PropTypes.shape({}),
  author: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  sharePost: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  sharePost: (id, wpType) => dispatch(actions.openShareModal({ id, wpType })),
});

export default connect(null, mapDispatchToProps)(PostItem);
