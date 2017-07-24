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
  loadedSlides,
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
          <PostItem
            post={post}
            users={users}
            categories={categories}
            tags={tags}
            active
            alreadyLoaded={false}
          />
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
          activeSlideChanged({ activeSlide: index, sliderAnimation });
        }}
      >
        {sliderPosts.map((p, i) => {
          if ((i < activeSlide - 1 || i > activeSlide + 1) && !loadedSlides.includes(i)) {
            return <div key={i} />;
          }

          return (
            <PostItem
              key={i}
              post={p}
              users={users}
              categories={categories}
              tags={tags}
              active={activeSlide === i}
              alreadyLoaded={loadedSlides.includes(i)}
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
  loadedSlides: PropTypes.arrayOf(PropTypes.number),
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
  loadedSlides: state.theme.postSlider.loadedSlides,
});

const mapDispatchToProps = dispatch => ({
  activeSlideChanged: options => dispatch(postSlider.activePostSlideChanged(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
