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
    threshold: PropTypes.number,
  };

  static defaultProps = {
    onChangeIndex: null,
    onTransitionEnd: null,
    threshold: 0.15,
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
    overflow: 'hidden',
  };

  static slide = {
    width: '100%',
    display: 'inline-block',
    left: '0px',
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

  static isScrollBouncing() {
    const { scrollHeight, scrollTop } = Swipe.scrollingElement;
    const { innerHeight } = Swipe.scrollingElement;
    return scrollTop < 0 || scrollTop > scrollHeight - innerHeight;
  }

  // STATES
  static IDLE = 'IDLE';
  static START = 'START';
  static SCROLLING = 'SCROLLING';
  // static BOUNCING = 'BOUNCING';
  static SWIPING = 'SWIPING';
  static MOVING = 'MOVING';

  constructor(props) {
    super(props);
    // Array with the scroll positions of each post
    this.scrolls = Array(props.children.length).fill(0);

    this.initialTouch = {};

    // this.isMoving = false;
    // this.isMovingHorizontally = false;
    // this.preventSwipe = false;
    // this.isSwiping = false;

    this.dx = 0;
    this.vx = 0;
    this.velocityThreshold = 5; // for velocity, arbitrary value

    this.fromProps = false;

    this.state = { active: props.index };

    // innerState
    this.innerState = Swipe.IDLE; // move this to react state?

    this.next = props.index;

    // this.handleScroll = this.handleScroll.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

    // new methods
    this.isMovingHorizontally = this.isMovingHorizontally.bind(this);
    this.firstOrLastSlideReached = this.firstOrLastSlideReached.bind(this);

    this.moveToNext = this.moveToNext.bind(this);
    this.updateActiveSlide = this.updateActiveSlide.bind(this);
    this.changeActiveSlide = this.changeActiveSlide.bind(this);

    // Style methods
    this.getCurrentScroll = this.getCurrentScroll.bind(this);
    this.stopSlideContainer = this.stopSlideContainer.bind(this);
    this.moveToCurrentSlide = this.moveToCurrentSlide.bind(this);
    // this.stopCurrentSlide = this.stopCurrentSlide.bind(this);
    this.swipeToNextSlide = this.swipeToNextSlide.bind(this);
    this.moveSlideContainer = this.moveSlideContainer.bind(this);
    this.updateSlideScrolls = this.updateSlideScrolls.bind(this);
  }

  async componentDidMount() {
    if (!window) return;

    // Initialize the scrolling element
    if (!Swipe.scrollingElement) Swipe.scrollingElement = await getScrollingElement();

    // Initialize the slides' style
    await fastdomPromised.mutate(this.updateSlideScrolls);

    // Gets the innerWidth...
    this.innerWidth = await fastdomPromised.measure(() => window.innerWidth);

    // Adds event listeners
    // window.addEventListener('scroll', this.handleScroll);

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
    // const { active } = this.state;
    const { isSwiping, ref, next } = this;

    // Ignore invalid Index
    if (index < 0 || index >= ref.children.length) return;

    // Ignore changes to same Index
    if (index === next) return;

    this.fromProps = true;
    this.next = index;
    this.changeActiveSlide();
  }

  shouldComponentUpdate() {
    return !this.fromProps; // ?
  }

  componentWillUpdate() {
    if (this.isSwiping) return;

    // ?
    this.fromProps = false;
    this.isSwiping = false;
  }

  componentWillUnmount() {
    this.ref.removeEventListener('touchstart', this.handleTouchStart);
    this.ref.removeEventListener('touchmove', this.handleTouchMove);
    // window.removeEventListener('scroll', this.handleScroll);
  }

  setInnerState(newState) {
    console.log(`${this.innerState} => ${newState}`);
    this.innerState = newState;
  }

  getCurrentScroll() {
    this.scrolls[this.state.active] = Swipe.scrollingElement.scrollTop;
  }

  isMovingHorizontally(pos) {
    const prevPos = this.initialTouch;
    return Math.abs(pos.pageX - prevPos.pageX) > Math.abs(pos.pageY - prevPos.pageY);
  }

  firstOrLastSlideReached() {
    const { active } = this.state;
    const { children } = this.props;
    return (active === 0 && this.dx >= 0) || (active === children.length - 1 && this.dx <= 0);
  }

  stopSlideContainer() {
    console.log('stopSlideContainer');
    this.ref.style.transition = 'none';
    this.ref.style.transform = 'none';
    // this.fromProps = false;
    // this.isSwiping = false;
  }

  moveToCurrentSlide() {
    console.log('moveToCurrentSlide');
    this.ref.style.transition = `transform 350ms ease-out`;
    this.ref.style.transform = `translateX(0)`;
  }

  // stopCurrentSlide() {
  //   console.log('stopCurrentSlide');
  //   this.ref.style.transition = 'none';
  //   this.ref.style.transform = 'none';
  // }

  swipeToNextSlide() {
    console.log('swipeToNextSlide');
    const { active } = this.state;
    const { next } = this;
    const move = (active - next) * 100; // percentage
    this.ref.style.transition = `transform 350ms ease-out`;
    this.ref.style.transform = this.dx ? `translateX(${move}%)` : 'none';
  }

  moveSlideContainer() {
    this.ref.style.transition = 'none';
    this.ref.style.transform = `translateX(${this.dx}px)`;
  }

  // SLIDES

  updateSlideScrolls() {
    const { active } = this.state;
    const { scrolls, ref } = this;

    Array.from(ref.children).forEach(({ style }, i) => {
      scrolls[i] = scrolls[i] || 0; // init scrolls if required

      style.position = i !== active ? 'absolute' : 'relative';
      style.transform =
        i !== active
          ? `translate(${100 * (i - active)}%, ${scrolls[active] - scrolls[i]}px)`
          : 'none';
    });
  }

  nextSlidePosition() {
    const { children, threshold } = this.props;
    const last = children.length - 1;
    let moveSlide = 0;

    // Position or velocity that triggers a slide change
    if (Math.abs(this.vx) > this.velocityThreshold)
      moveSlide = Math.sign(Math.sign(this.vx) + Math.sign(this.dx));
    else if (Math.abs(this.dx) > this.innerWidth * threshold) moveSlide = Math.sign(this.dx);

    let next = this.state.active - moveSlide;

    // Prevents going far away
    if (next < 0) next = 0;
    else if (next > last) next = last;

    return next;
  }

  // handleScroll() {
  //   fastdom.measure(this.getCurrentScroll);
  // }

  handleTouchStart(e) {
    const { IDLE, SCROLLING, START } = Swipe;
    if (this.innerState === IDLE && !Swipe.isScrollBouncing()) {
      const { targetTouches, target } = e;
      const [{ pageX, pageY }] = targetTouches;

      // Store initial touch
      this.initialTouch = { pageX, pageY };
      // Store the current scroll value
      fastdom.measure(this.getCurrentScroll);

      // Change current STATE
      this.setInnerState(Swipe.parentScrollableX(target) ? SCROLLING : START);
    } else e.preventDefault(); // Ignore event if the state is not IDLE
  }

  handleTouchMove(e) {
    const { START, SWIPING, SCROLLING } = Swipe;
    const [{ pageX, pageY }] = e.targetTouches;

    if (this.innerState === START && !this.isMovingHorizontally({ pageX, pageY })) {
      this.setInnerState(SCROLLING);
    } else if (this.innerState === START) { // START => SWIPING
      e.preventDefault(); // Avoid scroll.
      this.setInnerState(SWIPING);
      this.initialTouch = { pageX, pageY };
      fastdom.mutate(this.updateSlideScrolls);
    } else if (this.innerState === SWIPING) { // SWIPING
      e.preventDefault(); // Avoid scroll.

      const dxPrev = this.dx;

      // Updates dx value.
      this.dx = pageX - this.initialTouch.pageX;

      // In case you reach the first or the last slide...
      if (this.firstOrLastSlideReached()) {
        // Stops slide container.
        this.dx = 0;
        this.vx = 0;
        this.initialTouch.pageX = pageX;
      } else this.vx = this.vx * 0.5 + (this.dx - dxPrev) * 0.5; // Updates velocity value
      
      fastdom.mutate(this.moveSlideContainer);
    } else {
      console.log(`DONT MOVE 'cause ${this.innerState}`);
    }
  }

  handleTouchEnd() {
    const { IDLE, START, MOVING, SCROLLING, SWIPING } = Swipe;
    if ([START, SCROLLING].includes(this.innerState)) { // START || SCROLLING => IDLE
      this.setInnerState(IDLE);
    } else if (this.innerState === SWIPING) { // SWIPING => MOVING
      this.setInnerState(MOVING);
      // Move to next or to current slide according to next value.
      this.next = this.nextSlidePosition();
      if (this.next !== this.state.active) this.moveToNext();
      else if (this.dx !== 0) fastdom.mutate(this.moveToCurrentSlide);
      else {
        this.setInnerState(IDLE);
        fastdom.mutate(this.stopSlideContainer);
      };
    } else {
      console.log(`TOUCH_END IGNORED 'cause ${this.innerState}`);
    }
  }

  moveToNext() {
    const { onChangeIndex } = this.props;
    this.isSwiping = true;
    if (onChangeIndex) onChangeIndex({ index: this.next, fromProps: false });
    return fastdomPromised.mutate(this.swipeToNextSlide);
  }

  handleTransitionEnd({ target }) {
    const { IDLE } = Swipe;
    const skipFrame = () =>
      window.requestAnimationFrame(() => {
        const { onTransitionEnd } = this.props;
        const { active } = this.state;
        const { ref, fromProps, isSwiping, next } = this;
        // Ignores transitionEnd events from children.
        if (ref !== target) return;

        this.setInnerState(IDLE);

        if (isSwiping) {
          // Executes onTransitionEnd callback if index is going to change
          if (onTransitionEnd && next !== active) onTransitionEnd({ index: next, fromProps });
          this.fromProps = false;
          this.isSwiping = false;

          // Change Index
          if (next !== active) this.updateActiveSlide();
        } else {
          fastdom.mutate(this.stopSlideContainer);
        }
      });

    window.requestAnimationFrame(skipFrame);
  }

  async changeActiveSlide() {
    const { dx, next, fromProps } = this;
    const { active } = this.state;
    const { onChangeIndex } = this.props;

    this.isSwiping = true;

    if (onChangeIndex) onChangeIndex({ index: next, fromProps });

    this.setState({ active: next }, async () => {
      await fastdomPromised.mutate(() => {
        console.log('changeActiveSlide', active, next, this.scrolls[next]);
        this.ref.style.transition = 'none';
        this.ref.style.transform = `translateX(calc(${100 * (next - active)}% + ${dx}px))`;
        Swipe.scrollingElement.scrollTop = this.scrolls[next];
        this.updateSlideScrolls();
      });

      fastdom.mutate(this.moveToCurrentSlide);
    });
  }

  updateActiveSlide() {
    this.setState({ active: this.next }, () => {
      fastdom.mutate(() => {
        console.log('updateActiveSlide');
        Swipe.scrollingElement.scrollTop = this.scrolls[this.state.active];
        this.updateSlideScrolls();
        this.stopSlideContainer();
      });
    });
  }

  render() {
    const { container, limiter, list } = Swipe;

    const children = React.Children.map(this.props.children, (child, i) => (
      <div key={i} style={Swipe.slide}>
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
            }}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Swipe;
