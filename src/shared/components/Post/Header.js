import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Title from './Title';
import FeaturedImage from './FeaturedImage';
import Author from './Author';
import Fecha from './Fecha';
import SharedCount from './SharedCount';
import ReadingTime from './ReadingTime';

const Header = ({
  type,
  id,
  featuredImageDisplay,
  sharedCountPosition,
  readingTimePosition,
  postAuthorPosition,
  postFechaPosition,
}) => (
  <Container>
    {featuredImageDisplay && <FeaturedImage type={type} id={id} />}
    <Title
      type={type}
      id={id}
      isAlone={
        sharedCountPosition !== 'header' &&
        readingTimePosition !== 'header' &&
        postAuthorPosition !== 'header' &&
        postFechaPosition !== 'header'
      }
    />
    <React.unstable_AsyncMode>
      {(postAuthorPosition === 'header' || postFechaPosition === 'header') && (
        <InnerContainer>
          {postAuthorPosition === 'header' && <Author type={type} id={id} />}
          {/* {postFechaPosition === 'header' && <Fecha type={type} id={id} />} */}
        </InnerContainer>
      )}
      {(sharedCountPosition === 'header' || readingTimePosition === 'header') && (
        <InnerContainer>
          {sharedCountPosition === 'header' && <SharedCount type={type} id={id} />}
          {readingTimePosition === 'header' && <ReadingTime type={type} id={id} />}
        </InnerContainer>
      )}
    </React.unstable_AsyncMode>
  </Container>
);

Header.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  featuredImageDisplay: PropTypes.bool,
  sharedCountPosition: PropTypes.string,
  readingTimePosition: PropTypes.string,
  postAuthorPosition: PropTypes.string,
  postFechaPosition: PropTypes.string,
};

Header.defaultProps = {
  featuredImageDisplay: true,
  sharedCountPosition: 'header',
  readingTimePosition: 'header',
  postAuthorPosition: 'header',
  postFechaPosition: 'header',
};

export default inject(({ stores: { settings } }) => {
  const sharedCount = settings.theme.sharedCount || {};
  const readingTime = settings.theme.readingTime || {};
  const featuredImage = settings.theme.featuredImage || {};
  const postAuthor = settings.theme.postAuthor || {};
  const postFecha = settings.theme.postFecha || {};

  return {
    featuredImageDisplay: featuredImage.display,
    sharedCountPosition: sharedCount.position,
    readingTimePosition: readingTime.position,
    postAuthorPosition: postAuthor.position,
    postFechaPosition: postFecha.position,
  };
})(Header);

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
  color: ${({ theme }) => theme.colors.grey};
`;
