import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import IconClose from 'react-icons/lib/md/close';
import { Container } from '../../../shared/styled/Menu/CloseButton';

const CloseButton = ({ menuHasClosed }) => (
  <Container onClick={menuHasClosed}>
    <IconClose size={33} />
  </Container>
);

CloseButton.propTypes = {
  menuHasClosed: PropTypes.func.isRequired,
};

export default inject(({ stores: { theme } }) => ({
  menuHasClosed: theme.menu.hasClosed,
}))(CloseButton);
