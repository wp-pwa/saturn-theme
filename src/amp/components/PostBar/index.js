import React, { Fragment } from 'react';
import styled from 'react-emotion';
import MenuButton from '../Menu/MenuButton';
import Logo from './Logo';
import Nav from '../ListBar/Nav';

const PostBar = () => (
  <Fragment>
    <BarWrapper>
      <MenuButton />
      <Logo />
    </BarWrapper>
    <NavWrapper>
      <Nav />
    </NavWrapper>
  </Fragment>
);

export default PostBar;

export const BarWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 60;
  height: ${({ theme }) => theme.heights.bar};
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  z-index: 70;
`;

export const NavWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: ${({ theme }) => `calc(${theme.heights.bar} - 1px)`};
  z-index: 55;
  box-shadow: ${({ theme }) => theme.shadows.top};
`;
