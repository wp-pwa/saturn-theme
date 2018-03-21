import React from 'react';
import PropTypes from 'prop-types';
import { Container, Text, StyledIconNext } from '../../../shared/styled/ShareBar/NextButton';

const NextButton = ({ next }) => (
  <Container className="next-button" href={next}>
    <Text>Siguiente</Text>
    <StyledIconNext verticalAlign="none" />
  </Container>
);

NextButton.propTypes = {
  next: PropTypes.string
};

NextButton.defaultProps = {
  next: null
};

export default NextButton;
