/* eslint react/no-danger: 0, jsx-a11y/no-static-element-interactions: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { dep } from 'worona-deps';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as selectorCreators from '../../selectorCreators';
import Media from '../Media';
import ShareButton from './ShareButton';

const PostItemFirst = ({ Link, id, title, media, author }) =>
  <Post>
    <Link type="post" id={id}>
      <A>
        <Media lazy id={media} width="100%" height="100%" />
        <Info>
          <Title dangerouslySetInnerHTML={{ __html: title }} />
          <Author>
            {author}
          </Author>
        </Info>
      </A>
    </Link>
    <ShareButton id={id} type={'posts'} />
  </Post>;

PostItemFirst.propTypes = {
  Link: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  media: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired
};

const mapStateToProps = (state, { id }) => ({
  title: selectorCreators.post.getTitle(id)(state),
  media: selectorCreators.post.getMedia(id)(state),
  author: selectorCreators.post.getAuthor(id)(state),
  Link: dep('connection', 'components', 'Link')
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
