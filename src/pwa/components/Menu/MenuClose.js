import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import IconClose from 'react-icons/lib/md/close';
import * as actions from '../../actions';

const MenuClose = ({ menuHasClosed }) =>
  <Container onClick={menuHasClosed}>
    <IconClose size={33} />
  </Container>;

MenuClose.propTypes = {
  menuHasClosed: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  menuHasClosed: () => dispatch(actions.menu.hasClosed())
});

export default connect(null, mapDispatchToProps)(MenuClose);

// const touch = keyframes`
//   100% {
//     background-color: rgba(255, 255, 255, 0.2)
//   }
// `;

const Container = styled.div`
  width: ${({ theme }) => theme.titleSize};
  height: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;

  ${'' /* animation-name: ${({ touched }) => (touched ? touch : '')};
  animation-duration: 70ms;
  animation-timing-function: ease-out;
  animation-iteration-count: 2;
  animation-direction: alternate; */};
`;
