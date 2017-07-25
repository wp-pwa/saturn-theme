/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import IconShare from 'react-icons/lib/md/share';

import Media from '../Media';

import { shareModal, postSlider } from '../../actions';
import { actions } from '../../deps';

import styles from './styles.css';

const PostItem = ({
  id,
  post,
  postList,
  title,
  author,
  type,
  sharePost,
  activeSlideChanged,
  getAnotherPage,
}) =>
  <div className={styles[`${type}Post`]}>
    <Link
      to={`?p=${id}`}
      onClick={() => {
        const index = postList.indexOf(post.id);

        activeSlideChanged({ activeSlide: index, sliderAnimation: null });

        if (index >= postList.length - 2) {
          getAnotherPage();
        }
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
  getAnotherPage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  sharePost: (id, wpType) => {
    dispatch(shareModal.open({ id, wpType }));
    dispatch(shareModal.requestCount({ id, wpType }));
  },
  activeSlideChanged: options => {
    dispatch(postSlider.activePostSlideChanged(options));
  },
  getAnotherPage: () => dispatch(actions.anotherPostsPageRequested()),
});

export default connect(null, mapDispatchToProps)(PostItem);
