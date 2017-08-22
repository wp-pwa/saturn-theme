/* eslint react/no-danger: 0, jsx-a11y/no-static-element-interactions: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import * as selectors from '../../selectors';
import Media from '../Media';
import ShareButton from './ShareButton';

const PostItem = ({ Link, id, post, title, author }) =>
  <Post>
    <Link type="post" id={id}>
      <A>
        <Media lazy id={post.featured_media} width="40%" />
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

PostItem.propTypes = {
  Link: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  post: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  Link: dep('connection', 'components', 'Link'),
  activeSlide: selectors.post.getActiveSlide(state)
});

export default connect(mapStateToProps)(PostItem);

const Post = styled.div`
  box-sizing: border-box;
  min-height: 20vh;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.postListLight};
  color: ${({ theme }) => theme.postListDark};
  box-shadow: 0 0 3px 0 ${({ theme }) => theme.shadowColor};
  position: relative;
`;

const A = styled.a`
  all: inherit;
  box-shadow: none;
  display: flex;
  flex-direction: row-reverse;
  margin: 0;
`;

const Info = styled.div`
  box-sizing: border-box;
  width: 60%;
  height: 100%;
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
  font-size: 1.1rem;
  line-height: 1.4rem;
`;

const Author = styled.p`
  display: inline-block;
  font-weight: 300;
  padding: 10px;
  padding-top: 0;
  color: ${({ theme }) => theme.postListGrey};
  margin: 0;
  text-transform: uppercase;
  font-size: 0.7rem;
`;
