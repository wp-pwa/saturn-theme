import React from 'react';
import styled from 'react-emotion';
import Logo from './Logo';
import MenuButton from '../Menu/MenuButton';
import NotificationsButton from '../../elements/NotificationsButton';

const TitleBar = () => (
  <Container>
    <MenuButton />
    <Logo />
    <NotificationsButton />
  </Container>
);

export default TitleBar;

const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.heights.bar};
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
`;
