import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-swipeable-views';
import { dep } from 'worona-deps';
import styled from 'styled-components';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import Spinner from '../../elements/Spinner';
import PostItem from './PostItem';

class Post extends PureComponent {
  handleChangeIndex = index =>
    this.props.activePostSlideChangeStarted({
      from: 'slider',
      direction: this.props.activeSlide < index ? 'right' : 'left'
    });

  handleTransitionEnd = () => this.props.activePostSlideChangeFinished();

  renderPostItems = (post, index) => {
    const { activeSlide, users, categories, tags } = this.props;
    if (index < activeSlide - 2 || index > activeSlide + 2) return <div key={index} />;

    return (
      <PostItem
        key={index}
        id={post.id}
        post={post}
        users={users}
        categories={categories}
        tags={tags}
        active={activeSlide === index}
        slide={index}
      />
    );
  };

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
      activeSlide
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
        <Slider>
          <PostItem
            id={postList[activeSlide]}
            post={post}
            users={users}
            categories={categories}
            tags={tags}
            active
          />
        </Slider>
      );
    }

    const sliderPosts = postList.map(id => posts[id]);

    return (
      <Slider
        index={activeSlide}
        onChangeIndex={this.handleChangeIndex}
        onTransitionEnd={this.handleTransitionEnd}
      >
        {sliderPosts.map(this.renderPostItems)}
      </Slider>
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
  activePostSlideChangeFinished: PropTypes.func.isRequired,
  activePostSlideChangeStarted: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: dep('connection', 'selectors', 'getCurrentSingle')(state),
  isPostReady: dep('connection', 'selectors', 'isCurrentSingleReady')(state),
  users: dep('connection', 'selectors', 'getUsersEntities')(state),
  posts: dep('connection', 'selectors', 'getPostsEntities')(state),
  postList: dep('connection', 'selectorCreators', 'getListResults')('currentList')(state),
  isListReady: dep('connection', 'selectorCreators', 'isListReady')('currentList')(state),
  categories: dep('connection', 'selectors', 'getCategoriesEntities')(state),
  tags: dep('connection', 'selectors', 'getTagsEntities')(state),
  activeSlide: selectors.post.getActiveSlide(state),
  sliderLength: selectors.post.getSliderLength(state)
});

const mapDispatchToProps = dispatch => ({
  activePostSlideChangeStarted: payload =>
    dispatch(actions.postSlider.activePostSlideChangeStarted(payload)),
  activePostSlideChangeFinished: payload =>
    dispatch(actions.postSlider.activePostSlideChangeFinished(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

const SpinnerContainer = styled.div`
  box-sizing: border-box;
  height: 100vh;
`;
