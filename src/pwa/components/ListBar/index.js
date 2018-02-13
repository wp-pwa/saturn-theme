import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Logo from './Logo';
import MenuButton from '../Menu/MenuButton';
import NotificationsButton from '../../elements/NotificationsButton';
import Nav from './Nav';

const Header = ({ isHidden, listBarHide }) => (
  <Fragment>
    <BarWrapper>
      <MenuButton />
      <Logo />
      <NotificationsButton />
    </BarWrapper>
    <NavWrapper isHidden={isHidden && listBarHide}>
      <Nav />
    </NavWrapper>
  </Fragment>
);

Header.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  listBarHide: PropTypes.bool,
};

Header.defaultProps = {
  listBarHide: false,
};

const mapStateToProps = state => {
  const listBar =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'listBar')(state) || {};

  return {
    isHidden: state.theme.scroll.hiddenBars,
    listBarHide: listBar.hide,
  };
};

export default connect(mapStateToProps)(Header);

const BarWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 60;
  height: ${({ theme }) => theme.heights.bar};
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
`;

const NavWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: ${({ theme }) => `calc(${theme.heights.bar} - 1px)`};
  z-index: 55;
  transform: ${({ theme, isHidden }) =>
    isHidden ? `translateY(calc(-${theme.heights.navbar} + 1px))` : `translateY(0)`} };
  transition: ${({ isHidden }) => (!isHidden ? 'transform 0.3s ease 0.5s' : 'transform 0.3s ease')};
  box-shadow: ${({ theme }) => theme.shadows.top};
`;
