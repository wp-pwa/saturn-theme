import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
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
          {postFechaPosition === 'header' && <Fecha type={type} id={id} />}
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

const mapStateToProps = state => {
  const sharedCount =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'sharedCount')(state) || {};
  const readingTime =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'readingTime')(state) || {};
  const featuredImage =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'featuredImage')(state) || {};
  const postAuthor =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'postAuthor')(state) || {};
  const postFecha =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'postFecha')(state) || {};

  return {
    featuredImageDisplay: featuredImage.display,
    sharedCountPosition: sharedCount.position,
    readingTimePosition: readingTime.position,
    postAuthorPosition: postAuthor.position,
    postFechaPosition: postFecha.position,
  };
};

export default connect(mapStateToProps)(Header);

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
