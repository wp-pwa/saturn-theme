/* eslint react/no-danger: 0, jsx-a11y/no-static-element-interactions: 0 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import IconShare from 'react-icons/lib/md/share';
import styled from 'styled-components';
import Media from '../Media';
import { shareModal, postSlider } from '../../actions';

const PostItemFirst = ({
  id,
  post,
  postList,
  title,
  author,
  sharePost,
  activeSlide,
  saveTempPostSliderState,
  activePostSlideHasChanged,
}) =>
  <Post>
    <StyledLink
      to={`?p=${id}`}
      onClick={() => {
        const index = postList.indexOf(post.id);
        saveTempPostSliderState({
          activeSlide: index,
          latestSlide: activeSlide,
        });
        activePostSlideHasChanged({
          activeSlide: index,
          sliderAnimation: null,
          sliderLength: postList.length,
        });
      }}
    >
      <StyledMedia id={post.featured_media} />
      <Info>
        <Title dangerouslySetInnerHTML={{ __html: title }} />
        <Link to={`?author=${author.id}`}>
          <Author>
            {author.name}
          </Author>
        </Link>
      </Info>
    </StyledLink>
    <Share onClick={() => sharePost(id, 'posts')}>
      <IconShare size={27} />
    </Share>
  </Post>;

const Post = styled.div`
  box-sizing: border-box;
  min-height: 10vh;
  height: 55vh;
  margin-bottom: 5px;
  box-shadow: 0 0 3px 0 ${({ theme }) => theme.shadowColor};
  position: relative;
`;

const StyledLink = styled(Link)`
  margin: 0;
  all: inherit;
`;

const StyledMedia = styled(Media)`
  height: 100%;
  width: 100%;
`;

const Info = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  min-height: 20%;
  width: 100%;
  color: ${({ theme }) => theme.postListLight};
  -webkit-text-fill-color: ${({ theme }) => theme.postListLight};
  background-color: rgba(0, 0, 0, 0.5);
`;

const Title = styled.p`
  box-sizing: border-box;
  margin: 0;
  padding: 10px;
  padding-right: 20px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.5rem;
`;

const Author = styled.p`
  font-weight: 300;
  padding-left: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  color: ${({ theme }) => theme.postListGrey};
  margin: 0;
  text-transform: uppercase;
  font-size: 0.7rem;
  display: inline-block;
`;

const Share = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
  color: ${({ theme }) => theme.postListLight};
  height: ${({ theme }) => theme.shareSize};
  width: ${({ theme }) => theme.shareSize};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom-left-radius: 30%;
`;

PostItemFirst.propTypes = {
  id: PropTypes.number.isRequired,
  post: PropTypes.shape({}).isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({}).isRequired,
  sharePost: PropTypes.func.isRequired,
  activeSlide: PropTypes.number.isRequired,
  saveTempPostSliderState: PropTypes.func.isRequired,
  activePostSlideHasChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activeSlide: state.theme.postSlider.final.activeSlide,
});

const mapDispatchToProps = dispatch => ({
  sharePost: (id, wpType) => {
    dispatch(shareModal.open({ id, wpType }));
    dispatch(shareModal.requestCount({ id, wpType }));
  },
  activePostSlideHasChanged: options => {
    dispatch(postSlider.activePostSlideHasChanged(options));
  },
  saveTempPostSliderState: options => {
    dispatch(postSlider.saveTempPostSliderState(options));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItemFirst);
