import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { compose, withHandlers } from 'recompose';
import IconMenu from 'react-icons/lib/md/menu';
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
    menuHasOpen: theme.menu.hasOpen,
    sendEvent: analytics.sendEvent,
  })),
  withHandlers({
    onClick: ({ menuHasOpen, sendEvent, component }) => () => {
      menuHasOpen();
      sendEvent({ action: 'open menu', category: component });
    },
  }),
)(MenuButton);
