/* eslint react/no-danger: 0, jsx-a11y/no-static-element-interactions: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { dep } from 'worona-deps';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Media from '../Media';
import ShareButton from './ShareButton';

const PostItemFirst = ({ Link, id, post, title, author }) =>
  <Post>
    <Link type="post" id={id}>
      <A>
        <Media lazy id={post.featured_media} width="100%" height="100%" />
        <Info>
          <Title dangerouslySetInnerHTML={{ __html: title }} />
          <Author>
            {author.name}
          </Author>
        </Info>
      </A>
    </Link>
    <ShareButton id={post.id} wpType={'posts'} />
  </Post>;

PostItemFirst.propTypes = {
  Link: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  post: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  Link: dep('connection', 'components', 'Link'),
  activeSlide: state.theme.postSlider.final.activeSlide
});

export default connect(mapStateToProps)(PostItemFirst);

const Post = styled.div`
  box-sizing: border-box;
  min-height: 10vh;
  height: 55vh;
  margin-bottom: 5px;
  box-shadow: 0 0 3px 0 ${({ theme }) => theme.shadowColor};
  position: relative;
`;

const A = styled.a`
  margin: 0;
  all: inherit;
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
  padding: 10px;
  padding-right: 20px;
  color: ${({ theme }) => theme.postListGrey};
  margin: 0;
  text-transform: uppercase;
  font-size: 0.7rem;
  display: inline-block;
`;
