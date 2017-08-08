import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-swipeable-views';
import styled, { injectGlobal } from 'styled-components';
import { selectors, selectorCreators } from '../../deps';
import { postSlider } from '../../actions';
import Spinner from '../../elements/Spinner';
import PostItem from './PostItem';
import ShareBar from '../ShareBar';

class Post extends Component {
  render() {
    const {
      post,
      posts,
      postList,
      isPostReady,
      isListReady,
      users,
      categories,
      tags,
      activeSlide,
      tempActiveSlide,
      activePostSlideChangeFinished,
      activePostSlideChangeStarted,
    } = this.props;

    if (!isPostReady) {
      return (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
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
          onChangeIndex={currentIndex => {
            activePostSlideChangeStarted({
              activeSlide: currentIndex,
            });
          }}
          onTransitionEnd={() => {
            if (activeSlide === tempActiveSlide) return;

            const animation = activeSlide - tempActiveSlide > 0 ? 'left' : 'right';

            if (activeSlide === postList.length - 1 && animation === 'right') return;

            activePostSlideChangeFinished({
              activeSlide: tempActiveSlide,
              sliderAnimation: animation,
              sliderLength: postList.length,
            });
          }}
        >
          {sliderPosts.map((p, i) => {
            if (i < activeSlide - 2 || i > activeSlide + 2) {
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
              />
            );
          })}
        </Slider>
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
  activeSlide: PropTypes.number.isRequired,
  tempActiveSlide: PropTypes.number.isRequired,
  activePostSlideChangeFinished: PropTypes.func.isRequired,
  activePostSlideChangeStarted: PropTypes.func.isRequired,
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
  activeSlide: state.theme.postSlider.final.activeSlide,
  tempActiveSlide: state.theme.postSlider.temp.activeSlide,
});

const mapDispatchToProps = dispatch => ({
  activePostSlideChangeStarted: payload =>
    dispatch(postSlider.activePostSlideChangeStarted(payload)),
  activePostSlideChangeFinished: payload =>
    dispatch(postSlider.activePostSlideChangeFinished(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

// eslint-disable-next-line
injectGlobal`
  body {
    height: 100vh;
    overflow-x: hidden;
  }
`;

const SpinnerContainer = styled.div`
  box-sizing: border-box;
  height: 100vh;
`;
