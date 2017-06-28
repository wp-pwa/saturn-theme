import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import PostItem from './PostItem';
import { selectors } from '../../deps';

// import styles from './styles.css';

const Post = ({ postList, post, isReady, media, users }) => {
  // console.log(postList);
  return (
    <SwipeableViews>
      <PostItem isReady={isReady} post={post} media={media} users={users} />
      <PostItem isReady={isReady} post={post} media={media} users={users} />
      <PostItem isReady={isReady} post={post} media={media} users={users} />
    </SwipeableViews>
  );
};

Post.propTypes = {
  postList: PropTypes.shape({}).isRequired,
  post: PropTypes.shape({}),
  isReady: PropTypes.bool.isRequired,
  media: PropTypes.shape({}).isRequired,
  users: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  post: selectors.getCurrentSingle(state),
  isReady: selectors.isCurrentSingleReady(state),
  media: selectors.getMediaEntities(state),
  users: selectors.getUsersEntities(state),
  postList: selectors.getPostsEntities(state),
});

export default connect(mapStateToProps)(Post);
