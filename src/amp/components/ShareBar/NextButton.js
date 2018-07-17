import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Container, Text, StyledIconNext } from '../../../shared/styled/ShareBar/NextButton';
import { nextButton } from '../../analytics/classes';

const NextButton = ({ link, nextText }) => (
  <Container className={nextButton} href={link}>
    <Text>{nextText}</Text>
    <StyledIconNext verticalAlign="none" />
  </Container>
);

NextButton.propTypes = {
  link: PropTypes.string.isRequired,
  nextText: PropTypes.string.isRequired,
};

export default inject(({ stores: { connection, theme } }) => ({
  link: connection.selectedColumn.nextColumn.selectedItem.entity.link,
  nextText: theme.lang.get('next'),
}))(NextButton);
