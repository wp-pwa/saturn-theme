/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fastdom from 'fastdom/';
import fdPromised from 'fastdom/extensions/fastdom-promised';

import { getScrollingElement } from '../../../shared/helpers';

const fastdomPromised = fastdom.extend(fdPromised);

class Swipe extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    onChangeIndex: PropTypes.func,
    onTransitionEnd: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
  };

  static defaultProps = {
    onChangeIndex: null,
    onTransitionEnd: null,
  };

  // STYLES

  static list = {
    minHeight: '100vh',
  };

  static limiter = {
    width: 'auto',
    height: 'auto',
    position: 'relative',
    overflow: 'hidden',
  };

  static container = {
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflow: 'hidden',
  };

  // HELPERS

  static hasOverflowX(element) {
    return ['auto', 'scroll'].includes(window.getComputedStyle(element).overflowX);
  }

  static isScrollableX(element) {
    const { hasOverflowX } = Swipe;
    return element.getBoundingClientRect().width < element.scrollWidth && hasOverflowX(element);
  }

  static parentScrollableX(element) {
    const { isScrollableX, parentScrollableX } = Swipe;
    return element !== null && (isScrollableX(element) || parentScrollableX(element.parentElement));
  }

  static isMovingHorizontally(pos, prevPos) {
    return Math.abs(pos.pageX - prevPos.pageX) > Math.abs(pos.pageY - prevPos.pageY);
  }

  static isScrollBouncing() {
    const { scrollHeight, scrollTop } = Swipe.scrollingElement;
    const { innerHeight } = window;
    return scrollTop < 0 || scrollTop > scrollHeight - innerHeight;
  }

  constructor(props) {
    super(props);
    // Array with the scroll positions of each post
    this.scrolls = Array(props.children.length).fill(0);

    this.initialTouch = {};

    this.isMoving = false;
    this.isMovingHorizontally = false;
    this.preventSwipe = false;
    this.isSwiping = false;

    this.dx = 0;
    this.vx = 0;
    this.threshold = 5; // for velocity, arbitrary value

    this.fromProps = false;

    this.state = { active: props.index };

    this.next = props.index;

    this.handleScroll = this.handleScroll.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

    // new methods
    this.moveToNext = this.moveToNext.bind(this);
    this.updateActiveSlide = this.updateActiveSlide.bind(this);
    this.changeActiveSlide = this.changeActiveSlide.bind(this);

    // Style methods TODO - init them properly
    this.getCurrentScroll = this.getCurrentScroll.bind(this);
    this.stopSlideContainer = this.stopSlideContainer.bind(this);
    this.swipeToCurrentSlide = this.swipeToCurrentSlide.bind(this);
    this.swipeToNextSlide = this.swipeToNextSlide.bind(this);
    this.moveSlideContainer = this.moveSlideContainer.bind(this);
    this.updateSlideScrolls = this.updateSlideScrolls.bind(this);
  }

  async componentDidMount() {
    if (!window) return;

    Swipe.scrollingElement = await getScrollingElement();
    this.innerWidth = await fastdomPromised.measure(() => window.innerWidth);

    window.addEventListener('scroll', this.handleScroll);

    // Adds non-passive event listener for touchmove
    if (this.ref) {
      this.ref.addEventListener('touchstart', this.handleTouchStart, {
        passive: false,
        capture: true,
      });
      this.ref.addEventListener('touchmove', this.handleTouchMove, {
        passive: false,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { index } = nextProps;
    const { active } = this.state;
    const { isSwiping } = this;


    if (!isSwiping && index >= 0 && index !== active) {
      this.fromProps = true;
      this.next = index;
      console.log('CHANGE ACTIVE SLIDE');
      this.changeActiveSlide();
    }
  }

  shouldComponentUpdate() {
    return !this.fromProps; // ?
  }

  componentWillUpdate() {
    if (this.isSwiping) return;
    // Updates style for slide container
    fastdom.mutate(this.stopSlideContainer);
    this.fromProps = false;
    this.isSwiping = false;
  }

  componentWillUnmount() {
    this.ref.removeEventListener('touchstart', this.handleTouchStart);
    this.ref.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('scroll', this.handleScroll);
  }

  // <-- NEW STYLE METHODS -->

  getCurrentScroll() {
    this.scrolls[this.state.active] = Swipe.scrollingElement.scrollTop;
  }

  // CONTAINER

  stopSlideContainer() {
    this.ref.style.transition = `transform 0ms ease-out`;
    this.ref.style.transform = `none`;
    this.fromProps = false;
    this.isSwiping = false;
  }

  swipeToCurrentSlide() {
    if (this.dx) {
      this.isSwiping = true;
      this.ref.style.transition = `transform 350ms ease-out`;
      this.ref.style.transform = `translateX(0)`;
    } else {
      this.isSwiping = false;
      this.ref.style.transition = `transform 0ms ease-out`;
      this.ref.style.transform = 'none';
    }
  }

  swipeToNextSlide() {
    const { active } = this.state;
    const { next } = this;
    const move = (active - next) * 100; // percentage
    this.ref.style.transition = `transform 350ms ease-out`;
    this.ref.style.transform = this.dx ? `translateX(${move}%)` : 'none';
  }

  moveSlideContainer() {
    this.ref.style.transition = `transform 0ms ease-out`;
    this.ref.style.transform = `translateX(${this.dx}px)`;
  }

  // SLIDES

  updateSlideScrolls() {
    const { active } = this.state;
    const { scrolls } = this;
    Array.from(this.ref.children).forEach(({ style }, i) => {
      scrolls[i] = scrolls[i] || 0; // init scrolls if required
      style.width = '100%';
      style.display = 'inline-block';
      style.left = '0px';
      style.position = i !== active ? 'absolute' : 'relative';
      style.transform = i !== active ? `translate(${100 * (i - active)}%, ${scrolls[active] - scrolls[i]}px)` : 'none';
    });
  }

  // <-- end of NEW STYLE METHODS -->

  handleScroll() {
    fastdom.measure(this.getCurrentScroll);
  }

  handleTouchStart(e) {
    const { isScrollBouncing, parentScrollableX } = Swipe;
    // Avoids swipe and scroll when is swiping or bouncing
    if (this.isSwiping || isScrollBouncing()) {
      e.preventDefault();
      return;
    }

    const { targetTouches, target } = e;

    this.initialTouch.pageX = targetTouches[0].pageX;
    this.initialTouch.pageY = targetTouches[0].pageY;
    this.preventSwipe = parentScrollableX(target);
    fastdom.measure(this.getCurrentScroll);
  }

  handleTouchMove(e) {
    const { isScrollBouncing, isMovingHorizontally } = Swipe;
    // Avoids swipe and scroll when is swiping or bouncing
    if (this.isSwiping || isScrollBouncing()) {
      e.preventDefault();
      return;
    }

    const currentTouch = e.targetTouches[0];

    if (!this.isMoving && !this.preventSwipe && !this.isSwiping) {
      this.isMoving = true;
      this.isMovingHorizontally = isMovingHorizontally(currentTouch, this.initialTouch);
      this.initialTouch.pageX = currentTouch.pageX;
      this.initialTouch.pageY = currentTouch.pageY;

      if (this.isMovingHorizontally) fastdom.mutate(this.updateSlideScrolls);
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
        fastdom.mutate(this.moveSlideContainer);
      }
    }
  }

  async handleTouchEnd(e) {
    const { isScrollBouncing } = Swipe;
    // Avoids swipe and scroll when is swiping or bouncing
    if (this.isSwiping || isScrollBouncing()) {
      e.preventDefault();
      return;
    }

    this.preventSwipe = false;

    this.next = this.nextSlidePosition();

    await (this.next !== this.state.active
      ? this.moveToNext()
      : fastdomPromised.mutate(this.swipeToCurrentSlide));

    this.isMoving = false;
    this.vx = 0;
    this.dx = 0;
  }

  nextSlidePosition() {
    let moveSlide = 0;

    const last = this.props.children.length - 1;

    // Position or velocity that triggers a slide change
    if (Math.abs(this.vx) > this.threshold)
      moveSlide = Math.sign(Math.sign(this.vx) + Math.sign(this.dx));
    else if (Math.abs(this.dx) > this.innerWidth / 2) moveSlide = Math.sign(this.dx);

    let next = this.state.active - moveSlide;

    // Prevents going far away
    if (next < 0) next = 0;
    else if (next > last) next = last;

    return next;
  }

  handleTransitionEnd({ target }) {
    const skipFrame = () =>
      window.requestAnimationFrame(() => {
        const { onTransitionEnd } = this.props;
        // Ignores transitionEnd events from children.
        if (this.ref !== target) return;

        if (this.isSwiping) {
          const { fromProps } = this;
          // Executes onTransitionEnd callback if active will change
          if (onTransitionEnd) onTransitionEnd({ index: this.next, fromProps });
          this.fromProps = false;
          this.isSwiping = false;

          // Change Index
          this.updateActiveSlide();
        } else {
          fastdom.mutate(this.stopSlideContainer);
        }
      });

    window.requestAnimationFrame(skipFrame);
  }

  moveToNext() {
    const { onChangeIndex } = this.props;
    this.isSwiping = true;
    if (onChangeIndex) onChangeIndex({ index: this.next, fromProps: false });
    return fastdomPromised.mutate(this.swipeToNextSlide);
  }

  changeActiveSlide() {
    const { dx, next } = this;
    const { active } = this.state;
    const { onChangeIndex } = this.props;
    this.isSwiping = true;
    if (onChangeIndex) onChangeIndex({ index: next, fromProps: this.fromProps });



    this.setState({ active: next }, async () => {
      await fastdomPromised.mutate(() => {
        this.ref.style.transition = `transform 0ms ease-out`;
        this.ref.style.transform = `translateX(calc(${100 * (next - active)}% + ${dx}px))`;
        Swipe.scrollingElement.scrollTop = this.scrolls[next];
        this.updateSlideScrolls();
        console.log('BEFORE');
      });

      console.log('AFTER');
      this.dx = 1;
      fastdom.mutate(this.swipeToCurrentSlide);
    });

  }

  updateActiveSlide() {
    this.setState({ active: this.next }, () => {
      fastdom.mutate(() => {
        Swipe.scrollingElement.scrollTop = this.scrolls[this.state.active];
        this.updateSlideScrolls();
        this.stopSlideContainer();
      });
    });
  }

  render() {
    const { container, limiter, list } = Swipe;

    const children = React.Children.map(this.props.children, (child, i) => (
      <div className="slide" key={i}>
        <child.type {...child.props} />
      </div>
    ));

    return (
      <div style={container}>
        <div style={limiter}>
          <div
            style={list}
            onTouchEnd={this.handleTouchEnd}
            onTransitionEnd={this.handleTransitionEnd}
            ref={ref => {
              this.ref = ref;
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Swipe;
