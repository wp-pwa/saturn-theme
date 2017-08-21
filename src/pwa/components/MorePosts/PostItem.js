/* eslint react/no-danger: 0, jsx-a11y/no-static-element-interactions: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Truncate from 'react-truncate';
import Media from '../Media';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

const PostItem = ({ id, post, postList, title, activeSlide, activePostSlideChangeRequested }) =>
  <Post
    onClick={() => {
      const index = postList.indexOf(id);
      const animation = activeSlide - index > 0 ? 'left' : 'right';

      activePostSlideChangeRequested({
        activeSlide: index,
        sliderAnimation: animation,
        sliderLength: postList.length
      });
    }}
  >
    <Media lazy lazyHorizontal id={post.featured_media} width="100%" height="100%" />
    <Info>
      <Title>
        <Truncate lines={2}>
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </Truncate>
      </Title>
    </Info>
  </Post>;

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  post: PropTypes.shape({}).isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
  activeSlide: PropTypes.number.isRequired,
  activePostSlideChangeRequested: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  activeSlide: selectors.post.getActiveSlide(state)
});

const mapDispatchToProps = dispatch => ({
  activePostSlideChangeRequested: payload =>
    dispatch(actions.postSlider.activePostSlideChangeRequested(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);

const Post = styled.div`
  box-sizing: border-box;
  width: 250px;
  height: 100%;
  flex: 1 0 auto;
  background-color: ${({ theme }) => theme.postListLight};
  color: white;
  position: relative;
`;

const Info = styled.div`
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
  height: 4rem;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
`;

const Title = styled.div`
  margin: 0.5rem auto;
  width: 90%;
  height: 3rem;

  span {
    line-height: 1.5rem;
    font-size: 1rem;
  }
`;
