import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import IconClose from 'react-icons/lib/md/close';
import { Container } from '../../../shared/styled/Menu/CloseButton';

const CloseButton = ({ close }) => (
  <Container onClick={close}>
    <IconClose size={33} />
  </Container>
);

CloseButton.propTypes = {
  close: PropTypes.func.isRequired,
};

export default inject(({ stores: { theme } }) => ({
  close: theme.menu.close,
}))(CloseButton);
