import React from 'react';
import IconClose from 'react-icons/lib/md/close';
import { Container } from '../../../shared/styled/Menu/CloseButton';

const CloseButton = () => (
  <div on="tap:menu.close">
    <Container>
      <IconClose size={33} />
    </Container>
  </div>
);

export default CloseButton;
