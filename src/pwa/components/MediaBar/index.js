import React from 'react';
import styled from 'react-emotion';
import MenuButton from '../Menu/MenuButton';
import CloseButton from '../PostBar/CloseButton';
import SlideNumber from '../../elements/SlideNumber';

const MediaBar = () => (
  <Container>
    <MenuButton component="Media bar" />
    <SlideNumber />
    <CloseButton method="previousContext" component="Media bar" action="close media" />
  </Container>
);

export default MediaBar;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  height: ${({ theme }) => theme.heights.bar};
  width: 100%;
  display: flex;
  color: #fff;
  background-color: #0e0e0e;
  z-index: 70;
`;
