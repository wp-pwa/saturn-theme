import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import IconMenu from 'react-icons/lib/md/menu';
import { Container } from '../../../shared/styled/Menu/MenuButton';

const MenuButton = ({ menuHasOpen }) => (
  <Container onClick={menuHasOpen}>
    <IconMenu size={33} color="inherit" />
  </Container>
);

MenuButton.propTypes = {
  menuHasOpen: PropTypes.func.isRequired,
};

export default inject(({ theme }) => ({
  menuHasOpen: theme.menu.hasOpen,
}))(MenuButton);
