import React from 'react';
import styled from 'react-emotion';
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
  z-index: 50;
`;
