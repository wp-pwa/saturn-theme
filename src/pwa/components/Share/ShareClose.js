import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import IconClose from '../../../shared/components/Icons/Close';

const ShareClose = ({ close }) => (
  <Container onClick={close}>
    <IconClose size={33} />
  </Container>
);

ShareClose.propTypes = {
  close: PropTypes.func.isRequired,
};

export default inject(({ stores: { theme } }) => ({
  close: theme.shareModal.close,
}))(ShareClose);

const Container = styled.div`
  width: ${({ theme }) => theme.heights.bar};
  height: ${({ theme }) => theme.heights.bar};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`;
