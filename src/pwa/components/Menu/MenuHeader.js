import React from 'react';
import MenuLogo from './MenuLogo';
// import CloseButton from './CloseButton';
import { Container } from '../../../shared/styled/Menu/MenuHeader';

const MenuHeader = () => (
  <Container>
    <MenuLogo />
    {/* <CloseButton /> */}
  </Container>
);

export default MenuHeader;
