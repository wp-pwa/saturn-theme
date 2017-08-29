import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import * as selectors from '../../selectors';
import TitleBar from './TitleBar';
import Nav from './Nav';

const Header = ({ isPost, hiddenBars }) =>
  <Container isPost={isPost} isHidden={hiddenBars}>
    <TitleBar />
    <Nav />
  </Container>;

Header.propTypes = {
  isPost: PropTypes.bool.isRequired,
  hiddenBars: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isPost: dep('router', 'selectors', 'getType')(state) === 'post',
  hiddenBars: selectors.post.getHiddenBars(state)
});

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
