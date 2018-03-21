import React from 'react';
import PropTypes from 'prop-types';
import { Container, Text, StyledIconNext } from '../../../shared/styled/ShareBar/NextButton';
import { nextButton } from '../../analytics/classes';

const NextButton = ({ next }) => (
  <Container className={nextButton} href={next}>
    <Text>Siguiente</Text>
    <StyledIconNext verticalAlign="none" />
  </Container>
);

NextButton.propTypes = {
  next: PropTypes.string,
};

NextButton.defaultProps = {
  next: null,
};

export default NextButton;
