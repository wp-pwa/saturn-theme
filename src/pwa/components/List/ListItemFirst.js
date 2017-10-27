/* eslint react/no-danger: 0, jsx-a11y/no-static-element-interactions: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { dep } from 'worona-deps';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as selectorCreators from '../../selectorCreators';
import Media from '../Media';
import ShareButton from './ShareButton';

const ListItemFirts = ({ Link, id, title, media }) => (
  <Post>
    <Link type="post" id={id}>
      <A>
        <Media lazy lazyHorizontal id={media} width="100%" height="100%" />
        <Info>
          <Title dangerouslySetInnerHTML={{ __html: title }} />
        </Info>
      </A>
    </Link>
    <ShareButton id={id} type={'posts'} />
  </Post>
);

ListItemFirts.propTypes = {
  Link: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  media: PropTypes.number.isRequired,
};

const mapStateToProps = (state, { id }) => ({
  title: selectorCreators.post.getTitle(id)(state),
  media: selectorCreators.post.getMedia(id)(state),
  Link: dep('connection', 'components', 'Link'),
});

export default connect(mapStateToProps)(ListItemFirts);

const Post = styled.div`
  box-sizing: border-box;
  min-height: 10vh;
  height: 55vh;
  margin-bottom: 5px;
  box-shadow: 0 0 3px 0 ${({ theme }) => theme.shadowColor};
  position: relative;
`;

const A = styled.a`
  all: inherit;
  box-shadow: none;
  margin: 0;
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
  background-color: rgba(0, 0, 0, 0.6);
`;

const Title = styled.h2`
  box-sizing: border-box;
  margin: 0;
  padding: 15px;
  padding-right: 20px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.8rem;
`;
