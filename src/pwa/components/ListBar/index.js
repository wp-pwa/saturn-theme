import React, { Fragment } from 'react';
import styled from 'react-emotion';
import Logo from './Logo';
import MenuButton from '../Menu/MenuButton';
import NotificationsButton from '../../elements/NotificationsButton';
import Nav from './Nav';

const Header = () => (
  <Fragment>
    <BarWrapper>
      <MenuButton />
      <Logo />
      <NotificationsButton />
    </BarWrapper>
    <NavWrapper>
      <Nav />
    </NavWrapper>
  </Fragment>
);
export default Header;

const BarWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 60;
  height: ${({ theme }) => theme.heights.bar};
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
`;

const NavWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: ${({ theme }) => `calc(${theme.heights.bar} - 1px)`};
  z-index: 55;
  box-shadow: ${({ theme }) => theme.shadows.top};
`;
