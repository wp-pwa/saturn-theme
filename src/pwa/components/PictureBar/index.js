import React from 'react';
import styled from 'react-emotion';
import MenuButton from '../Menu/MenuButton';
import CloseButton from '../PostBar/CloseButton';
import SlideNumber from '../../elements/SlideNumber';

const PictureBar = () => (
  <Container>
    <MenuButton />
    <SlideNumber />
    <CloseButton method="previousContext" />
  </Container>
);

export default PictureBar;

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
