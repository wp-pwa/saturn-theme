import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconClose from 'react-icons/lib/md/close';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import { Container } from '../../../shared/styled/PostBar/CloseButton';

const CloseButton = ({ previousContextRequested }) => (
  <Hyperlink onClick={previousContextRequested}>
    <Container>
      <IconClose size={33} color="inherit" />
    </Container>
  </Hyperlink>
);

CloseButton.propTypes = {
  previousContextRequested: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  previousContextRequested: () =>
    dispatch(dep('connection', 'actions', 'previousContextRequested')()),
});

export default connect(null, mapDispatchToProps)(CloseButton);

const Hyperlink = styled.a`
  color: inherit;
`;
