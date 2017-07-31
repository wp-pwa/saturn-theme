/* eslint no-nested-ternary: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

class SliderPoints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: props.sliderAnimation,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeSlide !== this.props.activeSlide) {
      this.setState(
        {
          animation: null,
        },
        () => {
          setTimeout(() => {
            const animation = nextProps.sliderAnimation === 'left' ? 'left' : 'right';

            this.setState({
              animation,
            });
          }, nextProps.sliderAnimation === 'late' ? 350 : 20);
        }
      );
    }
  }

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

const revealLeft = keyframes`
  0% {
    transform: scale(0.001);
  }
  100% {
    transform: scale(1);
  }
`;

const slideLeftPoint2 = props => keyframes`
  from {
    background: ${props.theme.color};
  }
  to {
    transform: translateX(25px);
    background: ${props.theme.color};
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
    z-index: -1;
  }
  to {
    transform: scale(1) rotate(-135deg);
    z-index: -1;
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
  z-index: 1;
  box-sizing: border-box;
  width: calc(100% - ${props => props.theme.titleSize});
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

const Point = styled.div`
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  border: 1px solid ${props => props.theme.color};
  background: 'transparent';
  position: absolute;
  animation-duration: 0.8s;
  animation-timing-function: ease;
  animation-iteration-count: 1;
  border-radius: 50%;
  top: calc(50% - 4px);
`;

const Point1 = Point.extend`
  left: 5px;
  animation-fill-mode: 'forwards';
  animation-name: ${props => {
    if (!props.animate) return '';
    return props.animate === 'left' ? revealLeft : fadeRight;
  }};
`;

const Point2 = Point.extend`
  left: 5px;
  animation-name: ${props => {
    if (!props.animate) return '';
    return props.animate === 'left' ? slideLeftPoint2 : slideRightPoint2;
  }};
`;

const Point3 = Point.extend`
  left: 30px;
  background: ${props => props.theme.color};
  animation-name: ${props => {
    if (!props.animate) return '';
    return props.animate === 'left' ? slideLeftPoint3 : slideRightPoint3;
  }};
`;

const Point4 = Point.extend`
  left: 55px;
  animation-name: ${props => {
    if (!props.animate) return '';
    return props.animate === 'left' ? fadeLeft : revealRight;
  }};
`;

SliderPoints.propTypes = {
  activeSlide: PropTypes.number.isRequired,
  sliderAnimation: PropTypes.oneOf(['left', 'right', 'late']),
};

const mapStateToProps = state => ({
  activeSlide: state.theme.postSlider.final.activeSlide,
  sliderAnimation: state.theme.postSlider.final.sliderAnimation,
});

export default connect(mapStateToProps)(SliderPoints);
