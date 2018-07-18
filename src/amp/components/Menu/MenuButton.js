import React from 'react';
import IconMenu from '../../../shared/components/Icons/Hamburger';
import { Container } from '../../../shared/styled/Menu/MenuButton';
import { openMenu } from '../../analytics/classes';

const MenuButton = () => (
  <div className={openMenu} role="button" tabIndex="0" on="tap:menu.toggle">
    <Container>
      <IconMenu size={33} />
    </Container>
  </div>
);

export default MenuButton;
