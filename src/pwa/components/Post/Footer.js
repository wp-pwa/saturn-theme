import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TagList from './TagList';
// import Comments from '../Comments';

const Footer = ({ id }) =>
  <Container>
    <TagList id={id} />
    {/* <Comments disqusShortname={'adslzone'} /> */}
  </Container>;

Footer.propTypes = {
  id: PropTypes.number.isRequired
};

export default Footer;

const Container = styled.div`
  box-sizing: border-box;
  margin: 0 10px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
`;
