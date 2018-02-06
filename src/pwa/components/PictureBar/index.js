import React from 'react';
import MenuButton from '../Menu/MenuButton';
import CloseButton from '../PostBar/CloseButton';
import SlideNumber from '../../elements/SlideNumber';
import { Container } from '../../../shared/styled/PostBar';

const PictureBar = () => (
  <Container isHidden={false} dark>
    <MenuButton />
    <SlideNumber />
    <CloseButton method="previousContext" />
  </Container>
);

export default PictureBar;
