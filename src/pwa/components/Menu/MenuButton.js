import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import IconMenu from 'react-icons/lib/md/menu';
import { Container } from '../../../shared/styled/Menu/MenuButton';

const MenuButton = ({ menuHasOpen, sendEvent, component }) => (
  <Container onClick={() => {
    menuHasOpen();
    sendEvent({ action: 'open menu', category: component });
  }}>
    <IconMenu size={33} color="inherit" />
  </Container>
);

MenuButton.propTypes = {
  menuHasOpen: PropTypes.func.isRequired,
  sendEvent: PropTypes.func.isRequired,
  component: PropTypes.string.isRequired,
};

export default inject(({ stores: { theme, analytics } }, ) => ({
  menuHasOpen: theme.menu.hasOpen,
  sendEvent: analytics.sendEvent,
}))(MenuButton);
