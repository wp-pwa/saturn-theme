import React from 'react';
import IconMenu from 'react-icons/lib/md/menu';
import { Container } from '../../../shared/styled/Menu/MenuButton';

const MenuButton = () => (
  <div className="menu-button" role="button" tabIndex="0" on="tap:menu.toggle">
    <Container>
      <IconMenu size={33} verticalAlign='none' />
    </Container>
  </div>
);

export default MenuButton;
