import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import IconMenu from 'react-icons/lib/md/menu';
import { Container } from '../../../shared/styled/Menu/MenuButton';

const MenuButton = ({ open }) => (
  <Container onClick={open}>
    <IconMenu size={33} color="inherit" />
  </Container>
);

MenuButton.propTypes = {
  open: PropTypes.func.isRequired,
};

export default inject(({ stores: { theme } }) => ({
  open: theme.menu.open,
}))(MenuButton);
