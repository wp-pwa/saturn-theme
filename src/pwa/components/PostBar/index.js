import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import MenuButton from '../Menu/MenuButton';
import SliderPoints from './SliderPoints';
import CloseButton from './CloseButton';
import Logo from '../ListBar/Logo';
import NotificationsButton from '../NotificationsButton';
import Nav from '../ListBar/Nav';

class PostBar extends Component {
  static propTypes = {
    isBarHidden: PropTypes.bool.isRequired,
    postBarHide: PropTypes.bool,
    postBarTransparent: PropTypes.bool,
    postBarOpacity: PropTypes.number,
    postBarNavOnSsr: PropTypes.bool,
    ssr: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    postBarHide: true,
    postBarTransparent: false,
    postBarOpacity: 0.4,
    postBarNavOnSsr: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      ssr: props.ssr,
    };
  }

  render() {
    const {
      isBarHidden,
      postBarTransparent,
      postBarOpacity,
      postBarHide,
      postBarNavOnSsr,
    } = this.props;
    const { ssr } = this.state;

    const hasNav = ssr && postBarNavOnSsr;

    return (
      <Fragment>
        <BarWrapper
          isHidden={isBarHidden && postBarHide && !hasNav}
          isTransparent={postBarTransparent && !hasNav}
          postBarOpacity={postBarOpacity}
          hasNav={hasNav}
        >
          <MenuButton component="Post bar" />
          {hasNav ? (
            <Fragment>
              <Logo key="logo" />
              <NotificationsButton key="notifications" />
            </Fragment>
          ) : (
            <Fragment>
              <SliderPoints isTransparent={postBarTransparent} />
              <CloseButton
                eventCategory="Post bar"
                eventAction="close single"
              />
            </Fragment>
          )}
        </BarWrapper>
        {hasNav && (
          <Fragment>
            <NavWrapper isHidden={isBarHidden && postBarHide}>
              <Nav />
            </NavWrapper>
            <PointsWrapper isHidden={!isBarHidden}>
              <SliderPoints isNav />
            </PointsWrapper>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default inject(({ stores: { theme, settings, build } }) => {
  const postBar = settings.theme.postBar || {};

  return {
    isBarHidden: theme.scroll.isBarHidden,
    postBarTransparent: postBar.transparent,
    postBarOpacity: postBar.opacity,
    postBarHide: postBar.hide,
    postBarNavOnSsr: postBar.navOnSsr,
    ssr: build.isSsr,
  };
})(PostBar);

export const BarWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 60;
  height: ${({ theme }) => theme.heights.bar};
  width: 100%;
  display: flex;
  color: ${({ theme, isTransparent }) =>
    isTransparent ? theme.colors.white : theme.colors.text};
  background: ${({ theme, isTransparent, postBarOpacity }) =>
    isTransparent
      ? `rgba(0, 0, 0, ${postBarOpacity})`
      : theme.colors.background};
  transform: ${({ theme, isHidden }) =>
    isHidden
      ? `translateY(calc(-${theme.heights.bar} - 3px))`
      : `translateY(0)`} };
  transition: transform 0.3s ease;
  box-shadow: ${({ theme, isTransparent, hasNav }) =>
    !isTransparent && !hasNav && theme.shadows.top}
`;

const NavWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: ${({ theme }) => `calc(${theme.heights.bar} - 1px)`};
  z-index: 55;
  transform: ${({ theme, isHidden }) =>
    isHidden
      ? `translateY(calc(-${theme.heights.navbar} - 3px))`
      : `translateY(0)`} };
  transition: ${({ isHidden }) =>
    !isHidden ? 'transform 0.3s ease 0.5s' : 'transform 0.3s ease'};
  box-shadow: ${({ theme }) => theme.shadows.top};
`;

const PointsWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: ${({ theme }) => theme.heights.bar};
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5) 0%,
    transparent 100%
  );
`;
