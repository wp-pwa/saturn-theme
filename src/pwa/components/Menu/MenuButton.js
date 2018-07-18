import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { compose, withHandlers } from 'recompose';
import IconMenu from '../../../shared/components/Icons/Hamburger';
import { Container } from '../../../shared/styled/Menu/MenuButton';

const MenuButton = ({ onClick }) => (
  <Container onClick={onClick}>
    <IconMenu size={33} color="inherit" />
  </Container>
);

MenuButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default compose(
  inject(({ stores: { theme, analytics } }) => ({
    open: theme.menu.open,
    sendEvent: analytics.sendEvent,
  })),
  withHandlers({
    onClick: ({ open, sendEvent, component }) => () => {
      open();
      sendEvent({ action: 'open menu', category: component });
    },
  }),
)(MenuButton);
