import React from 'react';
import PropTypes from 'prop-types';
import { Container, Text, StyledIconNext } from '../../../shared/styled/ShareBar/NextButton';

const NextButton = ({ next }) => (
  <a href={next}>
    <Container>
      <Text>Siguiente</Text>
      <StyledIconNext verticalAlign='none' />
    </Container>
  </a>
);

NextButton.propTypes = {
  next: PropTypes.string
};

NextButton.defaultProps = {
  next: null
};

export default NextButton;
