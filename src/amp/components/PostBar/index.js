import React, { Fragment } from 'react';
import styled from 'styled-components';
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
  height: ${({ theme }) => theme.heights.bar};
  display: flex;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
`;

export const NavWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: relative;
  z-index: -1;
  box-shadow: ${({ theme }) => theme.shadows.top};
`;
