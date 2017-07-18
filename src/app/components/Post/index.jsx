import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { selectors, selectorCreators } from '../../deps';

import Spinner from '../../elements/Spinner';
import PostItem from './PostItem';
import ShareBar from '../ShareBar';

import styles from './styles.css';

const Swipe = virtualize(SwipeableViews);

class Post extends Component {
  constructor(props) {
    super(props);
    const { post, posts, postList, isPostReady } = props;

    if (!isPostReady) return;

    this.state = {
      swipeIndex: postList.indexOf(post.id),
      swipePosts: postList.map(id => posts[id]),
    };
  }

  render() {
    const { post, isPostReady, isListReady, users, categories, tags } = this.props;

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
            <PostItem post={post} users={users} categories={categories} tags={tags} active />
          </SwipeableViews>
          <ShareBar />
        </div>
      );
    }

    const slideRenderer = ({ key, index }) => {
      const swipeLength = this.state.swipePosts.length;

      let i = index;
      if (index < 0) i = swipeLength + index;
      else if (index > swipeLength - 1) i = index % swipeLength;

      return (
        <PostItem
          key={key}
          post={this.state.swipePosts[i]}
          users={users}
          categories={categories}
          tags={tags}
          active={this.state.swipeIndex === index}
        />
      );
    };

    return (
      <div>
        <Swipe
          index={this.state.swipeIndex}
          animateHeight
          overscanSlideAfter={1}
          overscanSlideBefore={1}
          slideRenderer={slideRenderer}
          onChangeIndex={index => {
            this.setState({
              swipeIndex: index,
            });
          }}
        />
        <ShareBar />
      </div>
    );
  }
}

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
