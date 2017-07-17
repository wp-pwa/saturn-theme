import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import PostItem from './PostItem';
import { selectors, selectorCreators } from '../../deps';

import ShareBar from '../ShareBar';

import Spinner from '../../elements/Spinner';

import styles from './styles.css';

const Post = ({ post, posts, isPostReady, postList, isListReady, users, categories, tags }) => {
  if (!isPostReady) {
    return (
      <div className={styles.wrap}>
        <Spinner />
      </div>
    );
  }

  if (!isListReady) {
    return (
      <div>
        <SwipeableViews>
          <PostItem post={post} users={users} categories={categories} tags={tags} />
        </SwipeableViews>
        <ShareBar />
      </div>
    );
  }

  const currentPostIndex = postList.indexOf(post.id);
  const swipeablePosts = [
    posts[postList[currentPostIndex - 1 >= 0 ? currentPostIndex - 1 : postList.length - 1]],
    posts[postList[currentPostIndex]],
    posts[postList[currentPostIndex + 1 <= postList.length - 1 ? currentPostIndex + 1 : 0]],
  ].map(p => <PostItem key={p.id} post={p} users={users} categories={categories} tags={tags} />);

  return (
    <div>
      <SwipeableViews index={1} animateHeight ignoreNativeScroll>
        {swipeablePosts}
      </SwipeableViews>
      <ShareBar />
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({}),
  isPostReady: PropTypes.bool.isRequired,
  posts: PropTypes.shape({}),
  postList: PropTypes.arrayOf(PropTypes.number),
  isListReady: PropTypes.bool.isRequired,
  users: PropTypes.shape({}).isRequired,
  categories: PropTypes.shape({}).isRequired,
  tags: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  post: selectors.getCurrentSingle(state),
  isPostReady: selectors.isCurrentSingleReady(state),
  users: selectors.getUsersEntities(state),
  posts: selectors.getPostsEntities(state),
  postList: selectorCreators.getListResults('currentList')(state),
  isListReady: selectorCreators.isListReady('currentList')(state),
  categories: selectors.getCategoriesEntities(state),
  tags: selectors.getTagsEntities(state),
});

export default connect(mapStateToProps)(Post);
