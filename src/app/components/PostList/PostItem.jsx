/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import IconShare from 'react-icons/lib/md/share';

import Media from '../Media';

import * as actions from '../../actions';

import styles from './styles.css';

const PostItem = ({ id, post, postList, title, author, type, sharePost, activeSlideChanged }) =>
  <div className={styles[`${type}Post`]}>
    <Link
      to={`?p=${id}`}
      onClick={() => {
        activeSlideChanged({ activeSlide: postList.indexOf(post.id), sliderAnimation: null });
      }}
    >
      <Media id={post.featured_media} className={styles[`${type}PostImage`]} />
      <div className={styles[`${type}PostInfo`]}>
        <p className={styles[`${type}PostTitle`]} dangerouslySetInnerHTML={{ __html: title }} />
        <Link to={`?author=${author.id}`}>
          <p className={styles[`${type}PostAuthor`]}>
            {author.name}
          </p>
        </Link>
      </div>
    </Link>
    <div className={styles[`${type}ShareButton`]} onClick={() => sharePost(id, 'posts')}>
      <IconShare size={27} />
    </div>
  </div>;

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  post: PropTypes.shape({}).isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  sharePost: PropTypes.func.isRequired,
  activeSlideChanged: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  sharePost: (id, wpType) => {
    dispatch(actions.shareModal.open({ id, wpType }));
    dispatch(actions.shareModal.requestCount({ id, wpType }));
  },
  activeSlideChanged: options => {
    dispatch(actions.postSlider.activePostSlideChanged(options));
  },
});

export default connect(null, mapDispatchToProps)(PostItem);
