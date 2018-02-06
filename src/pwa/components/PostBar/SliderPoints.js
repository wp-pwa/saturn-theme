import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled, { css, keyframes } from 'react-emotion';

class SliderPoints extends Component {
  static propTypes = {
    activeSlide: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    isFlat: PropTypes.bool.isRequired,
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
    const { isFlat } = this.props;
    return (
      <Container>
        <Wrapper>
          <Point1 animate={this.state.animation} isFlat={isFlat} />
          <Point2 animate={this.state.animation} isFlat={isFlat} />
          <Point3 animate={this.state.animation} isFlat={isFlat} />
          <Point4 animate={this.state.animation} isFlat={isFlat} />
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

const slideLeftPoint3 = keyframes`
  from {
    background: transparent;
  }
  to {
    transform: translateX(25px);
    background: transparent;
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
`;

const Wrapper = styled.div`
  position: relative;
  width: 70px;
  height: 100%;
`;

const pointStyle = (theme, isFlat) => css`
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  border: 1px solid ${isFlat ? theme.colors.text : theme.colors.white};
  background: 'transparent';
  position: absolute;
  animation-duration: 0.8s;
  animation-timing-function: ease;
  animation-iteration-count: 1;
  border-radius: 50%;
  top: calc(50% - 4px);
`;

const Point1 = styled.div`
  ${({ theme, isFlat }) => pointStyle(theme, isFlat)};
  left: 5px;
  animation-fill-mode: 'forwards';
  animation-name: ${({ animate }) => {
    if (!animate) return '';
    return animate === 'left' ? revealLeft : fadeRight;
  }};
`;

const Point2 = styled.div`
  ${({ theme, isFlat }) => pointStyle(theme, isFlat)};
  left: 5px;
  animation-name: ${({ theme, isFlat, animate }) => {
    if (!animate) return '';
    return animate === 'left'
      ? slideLeftPoint2(isFlat ? theme.colors.text : theme.colors.white)
      : slideRightPoint2;
  }};
`;

const Point3 = styled.div`
  ${({ theme, isFlat }) => pointStyle(theme, isFlat)};
  left: 30px;
  background: ${({ theme, isFlat }) => (isFlat ? theme.colors.text : theme.colors.white)};
  animation-name: ${({ animate }) => {
    if (!animate) return '';
    return animate === 'left' ? slideLeftPoint3 : slideRightPoint3;
  }};
`;

const Point4 = styled.div`
  ${({ theme, isFlat }) => pointStyle(theme, isFlat)};
  left: 55px;
  animation-name: ${({ animate }) => {
    if (!animate) return '';
    return animate === 'left' ? fadeLeft : revealRight;
  }};
`;
