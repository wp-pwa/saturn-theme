import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import IconClose from 'react-icons/lib/md/close';
import * as actions from '../../actions';

const ShareClose = ({ shareModalClosingRequested }) => (
  <Container onClick={shareModalClosingRequested}>
    <IconClose size={33} />
  </Container>
);

ShareClose.propTypes = {
  shareModalClosingRequested: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  shareModalClosingRequested: () => dispatch(actions.share.closingRequested()),
});

export default connect(null, mapDispatchToProps)(ShareClose);

const Container = styled.div`
  width: ${({ theme }) => theme.titleSize};
  height: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color};
`;
