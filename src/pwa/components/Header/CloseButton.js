/* eslint-disable no-undef */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import IconClose from 'react-icons/lib/md/close';
import styled from 'styled-components';
import Router from '@worona/next/router';

const CloseButton = ({ goBack }) =>
  <Container onClick={goBack}>
    <IconClose size={33} />
  </Container>;

CloseButton.propTypes = {
  goBack: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
  historyLength: typeof window !== 'undefined' ? window.history.length : 0,
});

const mergeProps = ({ historyLength }) => ({
  goBack() {
    if (historyLength > 1) window.navigator.back();
    else Router.push('/');
  },
});

export default connect(mapStateToProps, null, mergeProps)(CloseButton);

const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  width: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 15px;
  z-index: 50;
`;
