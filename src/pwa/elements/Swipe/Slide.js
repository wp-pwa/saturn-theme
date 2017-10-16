import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Slide = ({ children }) => (
  <Container
  >
    {children}
  </Container>
);

export default Slide;

Slide.propTypes = {
  children: PropTypes.node.isRequired,
}

const Container = styled.div`
  width: 100%;
  display: inline-block;
`;
