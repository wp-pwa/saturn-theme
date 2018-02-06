import React from 'react';
import styled from 'react-emotion';
import MenuButton from '../Menu/MenuButton';
import Logo from './Logo';
import HomeButton from './HomeButton';

const PostBar = () => (
  <Container isAmp>
    <MenuButton />
    <Logo />
    <HomeButton />
  </Container>
);

export default PostBar;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  height: ${({ theme }) => theme.heights.bar};
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  z-index: 70;
`;
