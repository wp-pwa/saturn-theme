import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import IconClose from '../../../shared/components/Icons/Close';
import { Container } from '../../../shared/styled/PostBar/CloseButton';

const CloseButton = ({ previousContextRequested }) => (
  <Hyperlink onClick={previousContextRequested}>
    <Container>
      <IconClose size={33} />
    </Container>
  </Hyperlink>
);

CloseButton.propTypes = {
  previousContextRequested: PropTypes.func.isRequired,
};

export default inject(({ stores: { connection } }) => ({
  previousContextRequested: connection.previousContextRequested,
}))(CloseButton);

const Hyperlink = styled.a`
  color: inherit;
`;
