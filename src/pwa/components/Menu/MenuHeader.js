import React from 'react';
import styled from 'react-emotion';
import MenuLogo from './MenuLogo';
import MenuClose from './MenuClose';

const MenuHeader = () => (
  <Container>
    <MenuLogo />
    <MenuClose />
  </Container>
);

export default MenuHeader;

const Container = styled.div`
  height: ${({ theme }) => theme.heights.bar};
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;
