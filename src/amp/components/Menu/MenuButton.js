import React from 'react';
import IconMenu from 'react-icons/lib/md/menu';
import { Container } from '../../../shared/styled/Menu/MenuButton';

const MenuButton = () => (
  <div on="tap:menu.toggle">
    <Container>
      <IconMenu size={33} />
    </Container>
  </div>
);

export default MenuButton;
