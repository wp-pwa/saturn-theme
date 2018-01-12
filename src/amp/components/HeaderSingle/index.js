import React from 'react';
import MenuButton from '../Menu/MenuButton';
import Logo from './Logo';
import HomeButton from './HomeButton';
import { Container } from '../../../shared/styled/HeaderSingle';

const HeaderSingle = () => (
  <Container isAmp>
    <MenuButton />
    <Logo />
    <HomeButton />
  </Container>
);

export default HeaderSingle;
