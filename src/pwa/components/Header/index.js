import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import TitleBar from './TitleBar';
// import NavBar from './NavBar';

const Header = ({ currentPost, hiddenBars }) =>
  <Container isPost={currentPost} isHidden={hiddenBars}>
    <TitleBar />
    {/* <NavBar /> */}
  </Container>;

Header.propTypes = {
  currentPost: PropTypes.number.isRequired,
  hiddenBars: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const getQuery = dep('router', 'selectors', 'getQuery');
  return {
    currentPost: parseInt(getQuery(state).p, 10) || 0,
    hiddenBars: state.theme.postSlider.hiddenBars,
  };
};

export default connect(mapStateToProps)(Header);

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 0;
  transform: ${({ theme, isPost, isHidden }) =>
    `translateY(-${isPost && isHidden ? theme.titleSize : 0})`};
  transition: transform 0.3s ease;
  z-index: 50;
`;
