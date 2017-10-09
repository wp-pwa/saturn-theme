import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Slide = ({ index, active, children }) => (
  <Container
    active={index === active}
    position={index - active}
  >
    {children}
  </Container>
);

export default Slide;

Slide.propTypes = {
  index: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

const Container = styled.div`
  width: 100%;
  display: inline-block;
  left: ${({ position }) => 100 * position}%;
`;
