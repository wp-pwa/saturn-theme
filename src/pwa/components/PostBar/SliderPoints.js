import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled, { css, keyframes } from 'react-emotion';

class SliderPoints extends Component {
  static propTypes = {
    activeSlide: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    isTransparent: PropTypes.bool,
    isNav: PropTypes.bool,
  };

  static defaultProps = {
    isNav: false,
    isTransparent: false,
  };

  constructor() {
    super();

    this.state = {
      animation: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    let animation;

    if (
      this.props.length !== nextProps.length &&
      this.props.activeSlide === nextProps.activeSlide
    ) {
      animation = null;
    } else if (nextProps.activeSlide > this.props.activeSlide) {
      animation = 'right';
    } else {
      animation = 'left';
    }

    this.setState(
      {
        animation: null,
      },
      () => {
        window.requestAnimationFrame(() => {
          this.setState({
            animation,
          });
        });
      },
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.animation !== this.state.animation;
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { isTransparent, isNav } = this.props;
    return (
      <Container isNav={isNav}>
        <Wrapper>
          <Point1 animate={this.state.animation} isTransparent={isTransparent} />
          <Point2 animate={this.state.animation} isTransparent={isTransparent} />
          <Point3 animate={this.state.animation} isTransparent={isTransparent} />
          <Point4 animate={this.state.animation} isTransparent={isTransparent} />
        </Wrapper>
      </Container>
    );
  }
}

export default inject(({ connection }) => {
  const { columns, column } = connection.context;

  return {
    activeSlide: columns.indexOf(column),
    length: columns.length,
  };
})(SliderPoints);

const revealLeft = keyframes`
  0% {
    transform: scale(0.001);
  }
  100% {
    transform: scale(1);
  }
`;

const slideLeftPoint2 = color => keyframes`
  from {
    background: ${color};
  }
  to {
    transform: translateX(25px);
    background: ${color};
  }
`;

const slideLeftPoint3 = color => keyframes`
  from {
    background: ${color};
  }
  to {
    transform: translateX(25px);
    background: ${color};
  }
`;

const fadeLeft = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.001);
  }
`;

const revealRight = keyframes`
  from {
    transform: scale(0.001) rotate(-45deg);
  }
  to {
    transform: scale(1) rotate(-135deg);
  }
`;

const slideRightPoint2 = keyframes`
  from {
    transform: translateX(25px);
  }
  to {
    transform: translateX(0);
  }
`;

const slideRightPoint3 = keyframes`
  from {
    transform: translateX(25px);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeRight = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.001);
  }
`;

const Container = styled.div`
  z-index: 51;
  box-sizing: border-box;
  width: calc(100vw - (2 * ${({ theme }) => theme.heights.bar}));
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    ${({ isNav }) => isNav && 'border: none'};
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 70px;
  height: 100%;
`;

const pointStyle = (theme, isTransparent) => css`
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  border: ${isTransparent ? `1px solid ${theme.colors.white}` : `1px solid ${theme.colors.text}`};
  background: ${isTransparent ? 'transparent' : theme.colors.background};
  position: absolute;
  animation-duration: 0.8s;
  animation-timing-function: ease;
  animation-iteration-count: 1;
  border-radius: 50%;
  top: calc(50% - 4px);
`;

const Point1 = styled.div`
  ${({ theme, isTransparent }) => pointStyle(theme, isTransparent)};
  left: 5px;
  animation-fill-mode: 'forwards';
  animation-name: ${({ animate }) => {
    if (!animate) return '';
    return animate === 'left' ? revealLeft : fadeRight;
  }};
`;

const Point2 = styled.div`
  ${({ theme, isTransparent }) => pointStyle(theme, isTransparent)};
  left: 5px;
  animation-name: ${({ theme, isTransparent, animate }) => {
    if (!animate) return '';
    return animate === 'left'
      ? slideLeftPoint2(isTransparent ? theme.colors.white : theme.colors.text)
      : slideRightPoint2;
  }};
`;

const Point3 = styled.div`
  ${({ theme, isTransparent }) => pointStyle(theme, isTransparent)};
  left: 30px;
  background: ${({ theme, isTransparent }) =>
    isTransparent ? theme.colors.white : theme.colors.text};
  animation-name: ${({ theme, animate, isTransparent }) => {
    if (!animate) return '';
    return animate === 'left'
      ? slideLeftPoint3(isTransparent ? 'transparent' : theme.colors.background)
      : slideRightPoint3;
  }};
`;

const Point4 = styled.div`
  ${({ theme, isTransparent }) => pointStyle(theme, isTransparent)};
  left: 55px;
  animation-name: ${({ animate }) => {
    if (!animate) return '';
    return animate === 'left' ? fadeLeft : revealRight;
  }};
`;
