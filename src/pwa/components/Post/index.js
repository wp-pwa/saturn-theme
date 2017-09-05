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
  constructor(props) {
    super(props);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.renderPostItems = this.renderPostItems.bind(this);
  }

  handleChangeIndex(index) {
    this.props.activePostSlideChangeStarted({
      from: 'slider',
      direction: this.props.activeSlide < index ? 'right' : 'left',
    });
  }


  handleTransitionEnd() {
    this.props.activePostSlideChangeFinished();
  }

  renderPostItems(id, index) {
    const { activeSlide } = this.props;

    if (index < activeSlide - 2 || index > activeSlide + 2) return <div key={index} />;

    return <PostItem key={index} id={id} active={activeSlide === index} slide={index} />;
  };

  render() {
    const { currentPostId, postList, isPostReady, isListReady, activeSlide } = this.props;

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
          <PostItem id={currentPostId} active />
        </Slider>
      );
    }

    return (
      <Slider
        index={activeSlide}
        onChangeIndex={this.handleChangeIndex}
        onTransitionEnd={this.handleTransitionEnd}
      >
        {postList.map(this.renderPostItems)}
      </Slider>
    );
  }
}

Post.propTypes = {
  isPostReady: PropTypes.bool.isRequired,
  currentPostId: PropTypes.number.isRequired,
  isListReady: PropTypes.bool.isRequired,
  postList: PropTypes.arrayOf(PropTypes.number),
  activeSlide: PropTypes.number.isRequired,
  activePostSlideChangeFinished: PropTypes.func.isRequired,
  activePostSlideChangeStarted: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isPostReady: dep('connection', 'selectors', 'isCurrentSingleReady')(state),
  isListReady: dep('connection', 'selectorCreators', 'isListReady')('currentList')(state),
  postList: dep('connection', 'selectorCreators', 'getListResults')('currentList')(state),
  currentPostId: selectors.post.getCurrentPostId(state),
  activeSlide: selectors.post.getActiveSlide(state),
  sliderLength: selectors.post.getSliderLength(state),
});

const mapDispatchToProps = dispatch => ({
  activePostSlideChangeStarted: payload =>
    dispatch(actions.postSlider.activePostSlideChangeStarted(payload)),
  activePostSlideChangeFinished: payload =>
    dispatch(actions.postSlider.activePostSlideChangeFinished(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

const SpinnerContainer = styled.div`
  box-sizing: border-box;
  height: 100vh;
`;
