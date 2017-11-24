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
  height: ${({ theme }) => theme.titleSize};
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
`;
