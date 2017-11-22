import React from 'react';
import styled from 'react-emotion';
import Logo from './Logo';
import MenuButton from './MenuButton';
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
  height: ${({ theme }) => theme.titleSize};
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor};
`;
