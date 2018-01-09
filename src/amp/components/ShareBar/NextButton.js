import React from 'react';
import PropTypes from 'prop-types';
import { Container, Text, StyledIconNext } from '../../../shared/styled/ShareBar/NextButton';

const NextButton = ({ next }) => (
  <a href={next}>
    <Container>
      <Text>Siguiente</Text>
      <StyledIconNext />
    </Container>
  </a>
);

NextButton.propTypes = {
  next: PropTypes.string.isRequired
};

export default NextButton;
