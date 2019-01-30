import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import Title from './Title';
import Featured from './Featured';
import FeaturedImage from './FeaturedImage';
import FeaturedVideo from './FeaturedVideo';
import Author from './Author';
import Fecha from './Fecha';
import SharedCount from './SharedCount';
import ReadingTime from './ReadingTime';
import SlotInjector from '../SlotInjector';

const Header = ({
  type,
  id,
  featuredImageDisplay,
  sharedCountPosition,
  readingTimePosition,
  postAuthorPosition,
  postFechaPosition,
  item,
  featuredVideo,
}) => (
  <Container>
    <Featured type={type} id={id}>
      {featuredImageDisplay && <FeaturedImage type={type} id={id} />}
      {featuredVideo && <FeaturedVideo src={featuredVideo} />}
    </Featured>
    <SlotInjector isAboveTheFold position="before header" item={item} />
    {(postAuthorPosition === 'header' || postFechaPosition === 'header') && (
      <FirstInnerContainer>
        {postAuthorPosition === 'header' && <Author type={type} id={id} />}
        {postFechaPosition === 'header' && <Fecha type={type} id={id} />}
      </FirstInnerContainer>
    )}
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
    <React.unstable_ConcurrentMode>
      {(sharedCountPosition === 'header' ||
        readingTimePosition === 'header') && (
        <InnerContainer>
          {readingTimePosition === 'header' && (
            <ReadingTime type={type} id={id} />
          )}
          {sharedCountPosition === 'header' && (
            <SharedCount type={type} id={id} />
          )}
        </InnerContainer>
      )}
    </React.unstable_ConcurrentMode>
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
  featuredVideo: PropTypes.string.isRequired,
  item: PropTypes.shape({}).isRequired,
};

Header.defaultProps = {
  featuredImageDisplay: true,
  sharedCountPosition: 'header',
  readingTimePosition: 'header',
  postAuthorPosition: 'header',
  postFechaPosition: 'header',
};

export default inject(({ stores: { settings, connection } }, { type, id }) => {
  const sharedCount = settings.theme.sharedCount || {};
  const readingTime = settings.theme.readingTime || {};
  const featuredImage = settings.theme.featuredImage || {};
  const postAuthor = settings.theme.postAuthor || {};
  const postFecha = settings.theme.postFecha || {};

  const entity = connection.entity(type, id);
  const hasFeaturedImage = !!entity.media.featured.id;
  const { featured_video: featuredVideo } = entity.raw;
  const hasFeaturedVideo = !!featuredVideo;

  return {
    featuredImageDisplay:
      !hasFeaturedVideo && hasFeaturedImage && featuredImage.display,
    sharedCountPosition: sharedCount.position,
    readingTimePosition: readingTime.position,
    postAuthorPosition: postAuthor.position,
    postFechaPosition: postFecha.position,
    item: connection.selectedContext.getItem({ item: { type, id } }),
    featuredVideo,
  };
})(Header);

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FirstInnerContainer = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: top;
  color: ${({ theme }) => theme.colors.evilGrey};
`;
export const InnerContainer = styled.div`
  display: flex;
  align-items: top;
  color: ${({ theme }) => theme.colors.evilGrey};
  margin-top: 0;
`;
