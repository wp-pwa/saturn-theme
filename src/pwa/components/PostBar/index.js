import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import MenuButton from '../Menu/MenuButton';
import SliderPoints from './SliderPoints';
import CloseButton from './CloseButton';
import Logo from '../ListBar/Logo';
import NotificationsButton from '../../elements/NotificationsButton';
import Nav from '../ListBar/Nav';

class PostBar extends Component {
  static propTypes = {
    isHidden: PropTypes.bool.isRequired,
    postBarHide: PropTypes.bool,
    postBarFlat: PropTypes.bool,
    postBarNavOnSsr: PropTypes.bool,
    ssr: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    postBarHide: true,
    postBarFlat: false,
    postBarNavOnSsr: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      ssr: props.ssr,
    };
  }

  render() {
    const { isHidden, postBarFlat, postBarHide, postBarNavOnSsr } = this.props;
    const { ssr } = this.state;

    const hasNav = ssr && postBarNavOnSsr;

    return (
      <Container>
        <BarWrapper
          isHidden={isHidden && postBarHide && !hasNav}
          isFlat={postBarFlat || hasNav}
          hasNav={hasNav}
        >
          {hasNav
            ? [<MenuButton key="menu-button" />, <Logo />, <NotificationsButton />]
            : [<MenuButton />, <SliderPoints isFlat={postBarFlat} />, <CloseButton />]}
        </BarWrapper>
        {hasNav && (
          <NavWrapper isHidden={isHidden && postBarHide}>
            <Nav />
          </NavWrapper>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const postBar =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'postBar')(state) || {};

  return {
    isHidden: state.theme.scroll.hiddenBars,
    ssr: state.build.ssr,
    postBarFlat: postBar.flat,
    postBarHide: postBar.hide,
    postBarNavOnSsr: postBar.navOnSsr,
  };
};

export default connect(mapStateToProps)(PostBar);

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 50;
`;

export const BarWrapper = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.heights.bar};
  width: 100%;
  display: flex;
  color: ${({ theme, isFlat }) => (isFlat ? theme.colors.text : theme.colors.white)};
  ${({ theme, isFlat }) =>
    isFlat
      ? `background: ${theme.colors.background};`
      : `
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.8) 0%,
          rgba(0, 0, 0, 0.4) 60%,
          rgba(0, 0, 0, 0) 100%
        );
    `};
  transform: ${({ theme, isHidden }) =>
    isHidden ? `translateY(-${theme.heights.bar})` : `translateY(0)`} };
  transition: transform 0.3s ease;
`;

const NavWrapper = styled.div`
  box-sizing: border-box;
  height: ${({ theme, isHidden }) => (isHidden ? 0 : theme.heights.navbar)};
  transition: height 0.3s ease;
  overflow-y: hidden;
`;
