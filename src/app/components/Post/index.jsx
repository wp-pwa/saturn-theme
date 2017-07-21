import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-swipeable-views';

import { selectors, selectorCreators } from '../../deps';
import { postSlider } from '../../actions';

import Spinner from '../../elements/Spinner';
import PostItem from './PostItem';
import ShareBar from '../ShareBar';

import styles from './styles.css';

const Post = ({
  post,
  posts,
  postList,
  isPostReady,
  isListReady,
  users,
  categories,
  tags,
  activeSlide,
  activeSlideChanged,
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
        <Slider>
          <PostItem post={post} users={users} categories={categories} tags={tags} active />
        </Slider>
        <ShareBar />
      </div>
    );
  }

  const sliderPosts = postList.map(id => posts[id]);

  return (
    <div>
      <Slider
        index={activeSlide}
        onChangeIndex={(index, latestIndex) => {
          const sliderAnimation = index > latestIndex ? 'right' : 'left';
          activeSlideChanged(index, sliderAnimation);
        }}
      >
        {sliderPosts.map((p, i) => {
          if (i < activeSlide - 1 || i > activeSlide + 1) return <div key={i} />;

          return (
            <PostItem
              key={i}
              post={p}
              users={users}
              categories={categories}
              tags={tags}
              active={activeSlide === i}
            />
          );
        })}
      </Slider>
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
  activeSlide: PropTypes.number.isRequired,
  activeSlideChanged: PropTypes.func.isRequired,
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
  activeSlideChanged: (activeSlide, sliderAnimation) =>
    dispatch(postSlider.activePostSlideChanged(activeSlide, sliderAnimation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
