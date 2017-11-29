import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled, { css, keyframes } from 'react-emotion';

class SliderPoints extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    list: PropTypes.shape({}).isRequired,
  };

  static getActiveSlide(id, list) {
    return list.findIndex(column =>
      column.items.find(item => item.singleId === id || item.listId === id),
    );
  }

  constructor() {
    super();

    this.state = {
      animation: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { id, list } = this.props;

    const activeSlide = SliderPoints.getActiveSlide(id, list);
    const nextActiveSlide = SliderPoints.getActiveSlide(nextProps.id, nextProps.list);

    const animation = nextActiveSlide > activeSlide ? 'right' : 'left';

    /*
     * This propbably could be refactored to a requestAnimationFrame thingy
     */
    this.setState(
      {
        animation: null,
      },
      () => {
        this.timeout = setTimeout(() => {
          this.setState({
            animation,
          });
        }, 10);
      },
    );
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.animation !== this.state.animation;
  // }
  //
  // componentWillUnmount() {
  //   clearTimeout(this.timeout);
  // }

  render() {
    return (
      <Container>
        <Wrapper>
          <Point1 animate={this.state.animation} />
          <Point2 animate={this.state.animation} />
          <Point3 animate={this.state.animation} />
          <Point4 animate={this.state.animation} />
        </Wrapper>
      </Container>
    );
  }
}

export default inject(stores => ({
  id: stores.connection.selected.id,
  list: stores.connection.context.columns,
}))(SliderPoints);

const revealLeft = keyframes`
  0% {
    transform: scale(0.001);
  }
  100% {
    transform: scale(1);
  }
`;

const slideLeftPoint2 = ({ color }) => keyframes`
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
  width: calc(100vw - (2 * ${({ theme }) => theme.titleSize}));
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

const pointStyle = theme => css`
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  border: 1px solid ${theme.color};
  background: 'transparent';
  position: absolute;
  animation-duration: 0.8s;
  animation-timing-function: ease;
  animation-iteration-count: 1;
  border-radius: 50%;
  top: calc(50% - 4px);
`;

const Point1 = styled.div`
  ${({ theme }) => pointStyle(theme)};
  left: 5px;
  animation-fill-mode: 'forwards';
  animation-name: ${({ animate }) => {
    if (!animate) return '';
    return animate === 'left' ? revealLeft : fadeRight;
  }};
`;

const Point2 = styled.div`
  ${({ theme }) => pointStyle(theme)};
  left: 5px;
  animation-name: ${({ theme, animate }) => {
    if (!animate) return '';
    return animate === 'left' ? slideLeftPoint2(theme) : slideRightPoint2;
  }};
`;

const Point3 = styled.div`
  ${({ theme }) => pointStyle(theme)};
  left: 30px;
  background: ${({ theme }) => theme.color};
  animation-name: ${({ animate }) => {
    if (!animate) return '';
    return animate === 'left' ? slideLeftPoint3 : slideRightPoint3;
  }};
`;

const Point4 = styled.div`
  ${({ theme }) => pointStyle(theme)};
  left: 55px;
  animation-name: ${({ animate }) => {
    if (!animate) return '';
    return animate === 'left' ? fadeLeft : revealRight;
  }};
`;
