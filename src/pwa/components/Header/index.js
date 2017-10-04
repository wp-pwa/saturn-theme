import React from 'react';
import styled from 'styled-components';
import TitleBar from './TitleBar';
import Nav from './Nav';

const Header = () => (
  <Container>
    <TitleBar />
    <Nav />
  </Container>
);
export default Header;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 0;
  transform: ${({ theme, isHidden }) => `translateY(-${isHidden ? theme.titleSize : 0})`};
  transition: transform 0.3s ease;
  z-index: 50;
`;
