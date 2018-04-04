import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Container, Text, StyledIconNext } from '../../../shared/styled/ShareBar/NextButton';
import { nextButton } from '../../analytics/classes';

const NextButton = ({ link }) => (
  <Container className={nextButton} href={link}>
    <Text>Siguiente</Text>
    <StyledIconNext verticalAlign="none" />
  </Container>
);

NextButton.propTypes = {
  link: PropTypes.string.isRequired,
};

export default inject(({ connection }) => ({
  link: connection.selectedColumn.nextColumn.selectedItem.entity.link,
}))(NextButton);
