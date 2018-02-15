import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import * as selectorCreators from '../../../pwa/selectorCreators';

const Sticky = ({ position, delay, duration }) => (
  <Container position={position} delay={delay} duration={duration}>
    <CloseButton position={position}>x</CloseButton>
    StickyMegabanner
  </Container>
);

Sticky.propTypes = {
  position: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
};

Sticky.defaultProps = {
  position: 'bottom',
  delay: 1000,
  duration: 5000,
};

const mapStateToProps = state => {
  const sticky = selectorCreators.ads.getOptions('sticky')(state);

  return {
    position: sticky.position,
    delayelay: sticky.delay,
    duration: sticky.duration,
  };
};

export default connect(mapStateToProps)(Sticky);

const Container = styled.div`
  box-sizing: border-box;
  position: fixed;
  ${({ position }) => (position === 'bottom' ? 'bottom: 0' : 'top: 0')};
  width: 100vw;
  height: ${({ theme }) => theme.heights.bar};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 2147483647;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5px 10px;
  border: 1px solid red;
`;

const CloseButton = styled.div`
  box-sizing: border-box;
  position: absolute;
  ${({ position }) => (position === 'bottom' ? 'top: -20px' : 'bottom: -20px')};
  right: 10px;
  height: 20px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ position }) =>
    position === 'bottom' ? 'border-top-left-radius: 20px' : 'border-bottom-left-radius: 20px'};
  ${({ position }) =>
    position === 'bottom' ? 'border-top-right-radius: 20px' : 'border-bottom-right-radius: 20px'};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid red;
`;
