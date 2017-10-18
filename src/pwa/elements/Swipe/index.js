/* global document */ /* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const hasOverflowX = element =>
  ['auto', 'scroll'].includes(window.getComputedStyle(element).overflowX);

const isScrollableX = element =>
  element.getBoundingClientRect().width < element.scrollWidth && hasOverflowX(element);

const parentScrollableX = element =>
  element !== null && (isScrollableX(element) || parentScrollableX(element.parentElement));

const isMovingHorizontally = (pos, prevPos) =>
  Math.abs(pos.pageX - prevPos.pageX) > Math.abs(pos.pageY - prevPos.pageY);

class Swipe extends Component {
  constructor(props) {
    super(props);
    // Array with the scroll positions of each post
    this.scrolls = Array(props.children.length).fill(0);

    this.initialTouch = {};

    this.isMoving = false;
    this.isMovingHorizontally = false;
    this.preventSwipe = false;
    this.isSwipping = false;

    this.dx = 0;
    this.vx = 0;
    this.threshold = 5; // arbitrary value

    this.state = {
      active: props.index,
    };

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    // React does not let you add a not-passive event listener...
    this.ref.addEventListener('touchmove', this.handleTouchMove, {
      passive: false,
    });
    // Fixes initial positions for children
    this.adjustChildrenPositions(this.state.active);
  }

  // shouldComponentUpdate() {
  //   return !this.isSwipping;
  // }

  // componentWillUpdate(nextProps) {
  //   // this.changeActiveSlide(nextProps.index);
  //   if (!this.isSwipping && nextProps.index !== this.state.active) {
  //     console.log('willUpdate', nextProps)
  //     this.changeActiveSlide(nextProps.index);
  //   }
  // }

  componentWillUnmount() {
    this.ref.removeEventListener('touchmove', this.handleTouchMove);
  }

  handleTouchStart({ targetTouches, target }) {
    this.initialTouch.pageX = targetTouches[0].pageX;
    this.initialTouch.pageY = targetTouches[0].pageY;
    this.preventSwipe = parentScrollableX(target);
    this.scrolls[this.state.active] = document.scrollingElement.scrollTop;
    this.adjustChildrenPositions(this.state.active);
  }

  handleTouchMove(e) {
    const currentTouch = e.targetTouches[0];

    if (!this.isMoving && !this.preventSwipe && !this.isSwipping) {
      this.isMoving = true;
      this.isMovingHorizontally = isMovingHorizontally(currentTouch, this.initialTouch);
      this.initialTouch.pageX = currentTouch.pageX;
      this.initialTouch.pageY = currentTouch.pageY;
    }

    if (this.isMoving && this.isMovingHorizontally) {
      // Avoid scroll
      e.preventDefault();
      const dxPrev = this.dx;
      this.dx = currentTouch.pageX - this.initialTouch.pageX;

      // In case you reach the first or the last post
      if (
        (this.state.active === 0 && this.dx >= 0) ||
        (this.state.active === this.props.children.length - 1 && this.dx <= 0)
      ) {
        // overwrites dx and vx
        this.dx = 0;
        this.vx = 0;
        this.initialTouch.pageX = currentTouch.pageX;
      } else {
        this.vx = this.vx * 0.5 + (this.dx - dxPrev) * 0.5;
        // Update style
        this.ref.style.transition = `transform 0ms ease-out`;
        this.ref.style.transform = `translateX(${this.dx}px)`;
      }
    }
  }

  handleTouchEnd() {
    this.preventSwipe = false;
    let moveSlide = 0;

    const last = this.props.children.length - 1;

    // Position or velocity that triggers a slide change
    if (Math.abs(this.vx) > this.threshold)
      moveSlide = Math.sign(Math.sign(this.vx) + Math.sign(this.dx));
    else if (Math.abs(this.dx) > window.innerWidth / 2) moveSlide = Math.sign(this.dx);

    let next = this.state.active - moveSlide;

    // Prevents going far away
    if (next < 0) next = 0;
    else if (next > last) next = last;

    // Slide is changing
    if (next !== this.state.active) {
      this.changeActiveSlide(next);
    } else {
      this.returnToCurrentSlide();
    }

    this.isMoving = false;
    this.vx = 0;
    this.dx = 0;
  }

  handleTransitionEnd({ target }) {
    const { onTransitionEnd } = this.props;
    // Ignores transitionEnd events from children.
    if (this.ref !== target) return;
    // Defers execution of the 'onTransitionEnd' callback.
    if (this.isSwipping) {
      if (onTransitionEnd) setTimeout(onTransitionEnd);
      this.isSwipping = false;
    }
  }

  handleSelect({ target }) {
    this.scrolls[this.state.active] = document.scrollingElement.scrollTop;
    this.adjustChildrenPositions(this.state.active);
    setTimeout(this.changeActiveSlide(parseInt(target.value, 10)));
  }

  returnToCurrentSlide() {
    this.ref.style.transition = `transform 350ms ease-out`;
    this.ref.style.transform = `translateX(0)`;
  }

  changeActiveSlide(next) {
    const { dx } = this;
    const { active } = this.state;
    const { onChangeIndex } = this.props;

    this.isSwipping = true;

    this.adjustChildrenPositions(next);
    this.ref.style.transition = `transform 0ms ease-out`;
    this.ref.style.transform = `translateX(calc(${100 * (next - active)}% + ${dx}px))`;
    document.scrollingElement.scrollTop = this.scrolls[next];

    this.setState({ active: next }, () => {
      this.ref.style.transition = `transform 350ms ease-out`;
      this.ref.style.transform = `translateX(0)`;
      if (onChangeIndex) onChangeIndex(this.state.active);
    });
  }

  adjustChildrenPositions(active) {
    const { children } = this.ref;

    for (let i = 0; i < children.length; i += 1) {
      const style = children[i].style;
      if (i !== active) {
        style.position = 'absolute';
        style.transform = `translateY(${this.scrolls[active] - this.scrolls[i]}px)`;
      } else {
        style.position = 'relative';
        style.transform = `none`;
      }
      style.left = `${100 * (i - active)}%`;
    }
  }

  render() {
    console.log('render SWIPE');
    const children = React.Children.map(this.props.children, (child, index) => (
      <Slide index={index} key={index} active={this.state.active}>
        <child.type {...child.props} />
      </Slide>
    ));

    const options = React.Children.map(this.props.children, (child, index) => (
      <option value={index}>{index + 1}</option>
    ));

    return (
      <Container>
        <Limiter>
          <List
            onTouchStartCapture={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
            onTransitionEnd={this.handleTransitionEnd}
            innerRef={ref => {
              this.ref = ref;
            }}
          >
            {children}
          </List>
        </Limiter>
        <Select onChange={this.handleSelect} value={this.state.active}>
          {options}
        </Select>
      </Container>
    );
  }
}

export default Swipe;

Swipe.propTypes = {
  index: PropTypes.number.isRequired,
  onChangeIndex: PropTypes.func,
  onTransitionEnd: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

const Slide = styled.div`
  width: 100%;
  display: inline-block;
  position: ${({ index, active }) => (index === active ? 'relative' : 'absolute')};
  left: ${({ index, active }) => `${100 * (index - active)}%`};
`;

const List = styled.div`
  min-height: 100vh;
`;

const Limiter = styled.div`
  width: auto;
  height: auto;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;

const Select = styled.select`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 9999;
`;
