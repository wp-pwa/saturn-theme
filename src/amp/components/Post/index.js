import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import Header from '../../../shared/components/Post/Header';
import Author from '../../../shared/components/Post/Author';
import Fecha from '../../../shared/components/Post/Fecha';
import Content from '../../../shared/components/Content';
import TagList from './TagList';

const Post = ({
  type,
  id,
  columnId,
  postAuthorPosition,
  postFechaPosition,
  featuredImageDisplay,
}) => (
  <Container>
    <Placeholder featuredImageDisplay={featuredImageDisplay} />
    <Header type={type} id={id} />
    <Content type={type} id={id} mstId={columnId} />
    {(postAuthorPosition === 'footer' || postFechaPosition === 'footer') && (
      <InnerContainer>
        {postAuthorPosition === 'footer' && <Author type={type} id={id} />}
        {postFechaPosition === 'footer' && <Fecha type={type} id={id} />}
      </InnerContainer>
    )}
    <TagList id={id} />
  </Container>
);

Post.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  columnId: PropTypes.string.isRequired,
  postAuthorPosition: PropTypes.string,
  postFechaPosition: PropTypes.string,
  featuredImageDisplay: PropTypes.bool,
};

Post.defaultProps = {
  postAuthorPosition: 'header',
  postFechaPosition: 'header',
  featuredImageDisplay: true,
};

export default inject(({ stores: { connection, settings } }) => {
  const featuredImage = settings.theme.featuredImage || {};
  const postAuthor = settings.theme.postAuthor || {};
  const postFecha = settings.theme.postFecha || {};

  return {
    type: connection.selectedItem.type,
    id: connection.selectedItem.id,
    columnId: connection.selectedColumn.mstId,
    postAuthorPosition: postAuthor.position,
    postFechaPosition: postFecha.position,
    featuredImageDisplay: featuredImage.display,
  };
})(Post);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  z-index: 0;
  position: relative;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 20px;
`;

const Placeholder = styled.div`
  width: 100%;
  height: ${({ theme, featuredImageDisplay }) =>
    featuredImageDisplay
      ? `calc(${theme.heights.bar})`
      : `calc(${theme.heights.bar} + ${theme.heights.navbar} - 1px)`};
  background-color: ${({ theme }) => theme.colors.background};
`;
