/* global document */ /* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Slide from './Slide';

const hasOverflowX = element =>
  ['auto', 'scroll'].includes(window.getComputedStyle(element).overflowX);

const isScrollableX = element =>
  element.getBoundingClientRect().width < element.scrollWidth && hasOverflowX(element);

const parentScrollableX = element =>
  element !== null && (isScrollableX(element) || isScrollableX(element.parentElement));

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

    this.threshold = 5; // arbitrary value
    this.hasSwipped = false;

    this.dx = 0;
    this.dy = 0;
    this.vx = 0;

    this.next = 0;
    this.state = {
      active: this.props.index,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.updateChildrenPaddings = this.updateChildrenPaddings.bind(this);
  }
  componentDidMount() {
    // React does not let you add a not-passive event listener...
    this.ref.addEventListener('touchmove', this.handleTouchMove, {
      passive: false,
    });
  }

  componentWillUnmount() {
    this.ref.removeEventListener('touchmove', this.handleTouchMove);
  }

  handleTransitionEnd({ target }) {
    // Ignores transitionEnd events from children.
    if (this.ref !== target) return;

    // Do nothing when next and active have the same value.
    if (this.next === this.state.active) return;

    this.hasSwipped = true;
    this.setState({ active: this.next }, () => {
      this.updateStyle();
      this.hasSwipped = false;
      this.updateChildrenPaddings();
      document.scrollingElement.scrollTop = this.scrolls[this.state.active];

      if (this.props.onTransitionEnd) this.props.onTransitionEnd();
      console.log('onTransitionEnd Callback FINISHED');
    });
  }

  handleTouchStart({ targetTouches, target }) {
    this.initialTouch.pageX = targetTouches[0].pageX;
    this.initialTouch.pageY = targetTouches[0].pageY;
    this.preventSwipe = parentScrollableX(target);
    this.scrolls[this.state.active] = document.scrollingElement.scrollTop;
    this.updateChildrenPaddings();
  }

  handleTouchMove(e) {
    const currentTouch = e.targetTouches[0];

    if (!this.isMoving && !this.preventSwipe) {
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
        this.updateStyle();
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

    this.isMoving = false;
    this.dx = 0;
    this.vx = 0;
    this.next -= moveSlide;

    if (this.next < 0) this.next = 0;
    else if (this.next > last) this.next = last;

    this.updateStyle();

    // Slide is changing
    if (this.next !== this.state.active && this.props.onChangeIndex) {
      this.props.onChangeIndex(this.next, this.state.active);
    }
  }

  handleSelect({ target }) {
    this.next = parseInt(target.value, 10);
    this.updateStyle();
  }

  updateStyle() {
    const { dx, next, hasSwipped } = this;
    const { active } = this.state;

    const movement = active - next;

    this.ref.style.transition = `transform ${dx !== 0 || hasSwipped ? 0 : 350}ms ease-out`;

    this.ref.style.transform = `translateX(${movement !== 0 ? `${100 * movement}%` : `${dx}px`})`;
  }

  updateChildrenPaddings() {
    const { active } = this.state;
    const { children } = this.ref;

    for (let i = 0; i < children.length; i += 1) {
      const style = children[i].style;
      if (i !== active) {
        style.position = 'absolute';
        style.transform = `translateY(${this.scrolls[active] - this.scrolls[i]}px)`;
      } else {
        style.position = 'relative';
        style.transform = `translateY(0px)`;
      }
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
        <Select onChange={this.handleSelect}>{options}</Select>
      </Container>
    );
  }
}

export default Swipe;

Swipe.propTypes = {
  index: PropTypes.number.isRequired,
  onChangeIndex: PropTypes.func,
  onTransitionEnd: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

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
`;
