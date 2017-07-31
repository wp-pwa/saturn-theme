import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectors } from '../../deps';
import TitleBar from './TitleBar';
import NavBar from './NavBar';

const Header = ({ currentPost, hiddenBars }) =>
  <Container isPost={currentPost} isHidden={hiddenBars}>
    <TitleBar />
    <NavBar />
  </Container>;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: ${props => (props.isPost && props.isHidden ? `-${props.theme.titleSize}` : 0)};
  z-index: 100;
  transition: top 0.3s ease;
`;

Header.propTypes = {
  currentPost: PropTypes.number.isRequired,
  hiddenBars: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  currentPost: parseInt(selectors.getURLQueries(state).p, 10) || 0,
  hiddenBars: state.theme.postSlider.hiddenBars,
});

export default connect(mapStateToProps)(Header);
