import React from 'react';
import MenuButton from '../Menu/MenuButton';
import CloseButton from '../HeaderSingle/CloseButton';
import SlideNumber from '../../elements/SlideNumber';
import { Container } from '../../../shared/styled/HeaderSingle';

const HeaderPicture = () => (
  <Container isHidden={false} dark>
    <MenuButton />
    <SlideNumber />
    <CloseButton method="previousContext" />
  </Container>
);

export default HeaderPicture;
