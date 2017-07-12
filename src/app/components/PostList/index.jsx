import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectorCreators, selectors } from '../../deps';
import PostItem from './PostItem';
import Spinner from '../../elements/Spinner';

import styles from './styles.css';

const PostList = ({ posts, postList, isReady, media, users }) => {
  if (isReady) {
    return <Spinner />;
  }
  return (<div className={styles.postList}>
    {postList.map((id, index) => {
      let type;

      if (!index) {
        type = 'first';
      } else if (index % 3 === 0) {
        type = 'alt';
      } else {
        type = 'normal';
      }

      return (
        <PostItem
          key={id}
          id={id}
          type={type}
          title={posts[id].title.rendered}
          media={media[posts[id].featured_media]}
          author={users[posts[id].author]}
        />
      );
    })}
  </div>);
};

PostList.propTypes = {
  posts: PropTypes.shape({}).isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  isReady: PropTypes.bool.isRequired,
  media: PropTypes.shape({}).isRequired,
  users: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  posts: selectors.getPostsEntities(state),
  postList: selectorCreators.getListResults('currentList')(state),
  isReady: selectorCreators.isListReady('currentList')(state),
  media: selectors.getMediaEntities(state),
  users: selectors.getUsersEntities(state),
});

export default connect(mapStateToProps)(PostList);
