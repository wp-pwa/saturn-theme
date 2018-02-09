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
  id,
  sharedCountPosition,
  readingTimePosition,
  featuredImageDisplay,
  postAuthorPosition,
  postFechaPosition,
}) => (
  <Container>
    {featuredImageDisplay && <FeaturedImage id={id} />}
    <Title id={id} />
    <InnerContainer>
      {postAuthorPosition === 'header' && <Author id={id} />}
      {postFechaPosition === 'header' && <Fecha id={id} />}
    </InnerContainer>
    <InnerContainer>
      {(!featuredImageDisplay || sharedCountPosition === 'header') && <SharedCount id={id} />}
      {(!featuredImageDisplay || readingTimePosition === 'header') && <ReadingTime id={id} />}
    </InnerContainer>
  </Container>
);

Header.propTypes = {
  id: PropTypes.number.isRequired,
  sharedCountPosition: PropTypes.string,
  readingTimePosition: PropTypes.string,
  featuredImageDisplay: PropTypes.bool,
  postAuthorPosition: PropTypes.bool,
  postFechaPosition: PropTypes.bool,
};

Header.defaultProps = {
  sharedCountPosition: 'header',
  readingTimePosition: 'header',
  featuredImageDisplay: true,
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
    sharedCountPosition: sharedCount.position,
    readingTimePosition: readingTime.position,
    featuredImageDisplay: featuredImage.display,
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
