import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import MenuButton from '../Header/MenuButton';
import SliderPoints from './SliderPoints';
import CloseButton from './CloseButton';
import * as selectors from '../../selectors';

const Bar = ({ isHidden }) => (
  <Container isHidden={isHidden}>
    <MenuButton />
    <SliderPoints />
    <CloseButton />
  </Container>
);

Bar.propTypes = {
  isHidden: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isHidden: selectors.post.getHiddenBars(state),
});

export default connect(mapStateToProps)(Bar);

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor};
  transform: ${({ theme, isHidden }) => `translateY(-${isHidden ? theme.titleSize : 0})`};
  transition: transform 0.3s ease;
  z-index: 70;
`;
