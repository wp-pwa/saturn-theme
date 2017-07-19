import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';

import { selectors, selectorCreators } from '../../deps';
import { postSlider } from '../../actions';

import Spinner from '../../elements/Spinner';
import PostItem from './PostItem';
import ShareBar from '../ShareBar';

import styles from './styles.css';

const Slider = virtualize(SwipeableViews);

const Post = ({
  post,
  posts,
  postList,
  isPostReady,
  isListReady,
  users,
  categories,
  tags,
  sliderLength,
  activeSlide,
  changeActiveSlide,
}) => {
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

  const sliderPosts = postList.map(id => posts[id]);

  //eslint-disable-next-line
  const slideRenderer = ({ key, index }) => {
    let i = index;
    if (index < 0) i = sliderLength + index;
    else if (index > sliderLength - 1) i = index % sliderLength;

    return (
      <PostItem
        key={key}
        post={sliderPosts[i]}
        users={users}
        categories={categories}
        tags={tags}
        active={activeSlide === index}
      />
    );
  };

  return (
    <div>
      <Slider
        index={activeSlide}
        animateHeight
        overscanSlideAfter={1}
        overscanSlideBefore={1}
        slideRenderer={slideRenderer}
        onChangeIndex={(index, latestIndex) => {
          const sliderAnimation = index > latestIndex ? 'right' : 'left';

          changeActiveSlide(index, sliderAnimation);
        }}
      />
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
  sliderLength: PropTypes.number.isRequired,
  activeSlide: PropTypes.number.isRequired,
  changeActiveSlide: PropTypes.func.isRequired,
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
  sliderLength: state.theme.postSlider.sliderLength,
  activeSlide: state.theme.postSlider.activeSlide,
});

const mapDispatchToProps = dispatch => ({
  changeActiveSlide: (activeSlide, sliderAnimation) =>
    dispatch(postSlider.changeActivePostSlide(activeSlide, sliderAnimation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
