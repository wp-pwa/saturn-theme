import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import PostItem from './PostItem';
import { selectors } from '../../deps';

import ShareBar from '../ShareBar';

import Spinner from '../../elements/Spinner';

import styles from './styles.css';

const Post = ({ post, isReady, media, users, categories, tags }) => {
  if (!isReady) {
    return (
      <div className={styles.wrap}>
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <SwipeableViews>
        <PostItem
          isReady={isReady}
          post={post}
          media={media}
          users={users}
          categories={categories}
          tags={tags}
        />
        <PostItem
          isReady={isReady}
          post={post}
          media={media}
          users={users}
          categories={categories}
          tags={tags}
        />
        <PostItem
          isReady={isReady}
          post={post}
          media={media}
          users={users}
          categories={categories}
          tags={tags}
        />
      </SwipeableViews>
      <ShareBar />
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({}),
  isReady: PropTypes.bool.isRequired,
  media: PropTypes.shape({}).isRequired,
  users: PropTypes.shape({}).isRequired,
  categories: PropTypes.shape({}).isRequired,
  tags: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  post: selectors.getCurrentSingle(state),
  isReady: selectors.isCurrentSingleReady(state),
  media: selectors.getMediaEntities(state),
  users: selectors.getUsersEntities(state),
  postList: selectors.getPostsEntities(state),
  categories: selectors.getCategoriesEntities(state),
  tags: selectors.getTagsEntities(state),
});

export default connect(mapStateToProps)(Post);
