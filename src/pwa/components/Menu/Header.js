import React from 'react';
import styled from 'styled-components';
import Logo from '../Header/Logo';
import CloseButton from './CloseButton';

const Header = () =>
  <Container>
    <Logo />
    <CloseButton />
  </Container>;

export default Header;

const Container = styled.div`
  height: ${({ theme }) => theme.titleSize};
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
`;
