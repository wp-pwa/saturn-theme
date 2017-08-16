/* eslint react/no-danger: 0, jsx-a11y/no-static-element-interactions: 0 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Truncate from 'react-truncate';
import Media from '../Media';
import * as actions from '../../actions';

const PostItem = ({
  id,
  post,
  postList,
  title,
  activePostSlideChangeRequested,
}) =>
  <Post>
    <StyledLink
      to={`?p=${id}`}
      onClick={() => {
        const index = postList.indexOf(post.id);

        activePostSlideChangeRequested({
          activeSlide: index,
          sliderAnimation: null,
          sliderLength: postList.length,
        });
      }}
    >
      <Media lazy id={post.featured_media} width="100%" height="100%" />
      <Info>
        <Truncate lines={2}>
          <Title dangerouslySetInnerHTML={{ __html: title.concat(title, 3) }} />
        </Truncate>
      </Info>
    </StyledLink>
  </Post>;

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  post: PropTypes.shape({}).isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
  activePostSlideChangeRequested: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activeSlide: state.theme.postSlider.final.activeSlide,
});

const mapDispatchToProps = dispatch => ({
  activePostSlideChangeRequested: payload =>
    dispatch(actions.postSlider.activePostSlideChangeRequested(payload)),
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

const StyledLink = styled(Link)`
  all: inherit;
`;

const Info = styled.div`
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
  height: 40%;
  position: absolute;
  background: rgba(0,0,0,0.5);
`;

const Title = styled.p`
  box-sizing: border-box;
  margin: 0;
  padding: 10px;
  padding-right: 20px;
  padding-bottom: 5px;
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 1.4rem;
  color: white;
  white-space: normal;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
  overflow: hidden
`;
