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

  static isInsideScrollableX(elem) {
    if (!elem) return false;
    const hasOverflowX = ['auto', 'scroll'].includes(window.getComputedStyle(elem).overflowX);
    const isScrollableX = elem.getBoundingClientRect().width < elem.scrollWidth && hasOverflowX;
    return isScrollableX || Swipe.isInsideScrollableX(elem.parentElement);
  }

  static isHorizontallyScrollable(element) {
    return fastdomPromised.measure(() => Swipe.isInsideScrollableX(element));
  }

  static isScrollBouncing() {
    return fastdomPromised.measure(() => {
      const { scrollHeight, scrollTop } = Swipe.scrollingElement;
      const { innerHeight } = Swipe.scrollingElement;
      return scrollTop < 0 || scrollTop > scrollHeight - innerHeight;
    });
  }

  // STATES
  static IDLE = 'IDLE';
  static START = 'START';
  static SCROLLING = 'SCROLLING';
  static SWIPING = 'SWIPING';
  static MOVING = 'MOVING';
  static MOVING_FROM_PROPS = 'MOVING_FROM_PROPS';

  constructor(props) {
    super(props);

    const { index } = props;

    // Array with the scroll positions of each post
    this.scrolls = Array(props.children.length).fill(0);

    this.initialTouch = {};

    this.dx = 0;
    this.vx = 0;
    this.velocityThreshold = 5; // for velocity, arbitrary value

    // innerState
    this.innerState = Swipe.IDLE;

    // React state
    this.state = { next: index, active: index, previous: index };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

    this.isMovingHorizontally = this.isMovingHorizontally.bind(this);
    this.firstOrLastSlideReached = this.firstOrLastSlideReached.bind(this);

    this.updateActiveSlide = this.updateActiveSlide.bind(this);
    this.changeActiveSlide = this.changeActiveSlide.bind(this);

    // Style methods
    this.storeCurrentScroll = this.storeCurrentScroll.bind(this);
    this.stopSlideContainer = this.stopSlideContainer.bind(this);
    this.moveToCurrentSlide = this.moveToCurrentSlide.bind(this);
    this.moveFromPropsToSlide = this.moveFromPropsToSlide.bind(this);
    this.swipeToNextSlide = this.swipeToNextSlide.bind(this);
    this.moveSlideContainer = this.moveSlideContainer.bind(this);
    this.updateSlideScrolls = this.updateSlideScrolls.bind(this);
  }

  async componentDidMount() {
    if (!window) return;

    // Gets scrolling element.
    if (!Swipe.scrollingElement) Swipe.scrollingElement = await getScrollingElement();

    // Initialize scroll for all slides.
    await this.updateSlideScrolls(this.state.active);

    // Gets the innerWidth...
    this.innerWidth = await fastdomPromised.measure(() => window.innerWidth);

    // Adds event listeners
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

  componentWillReceiveProps({ index, children }) {
    const { MOVING_FROM_PROPS } = Swipe;
    const { next } = this.state;

    if (index < 0 || index >= children.length) return; // Ignore invalid Index
    if (index === next) return; // Ignore changes to same Index

    // this.next = index;
    this.setInnerState(MOVING_FROM_PROPS);
    this.changeActiveSlide(index);
  }

  componentWillUnmount() {
    this.ref.removeEventListener('touchstart', this.handleTouchStart);
    this.ref.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('scroll', this.handleScroll);
  }

  setInnerState(newState) {
    console.log(`${this.innerState} => ${newState}`);
    this.innerState = newState;
  }

  storeCurrentScroll() {
    return fastdomPromised.measure(() => {
      const { active } = this.state;
      this.scrolls[active] = Swipe.scrollingElement.scrollTop;
    });
  }

  restoreCurrentScroll() {
    return fastdomPromised.measure(() => {
      const { active } = this.state;
      Swipe.scrollingElement.scrollTop = this.scrolls[active];
    });
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
    return fastdomPromised.measure(() => {
      this.ref.style.transition = 'none';
      this.ref.style.transform = 'none';
    });
  }

  moveToCurrentSlide() {
    console.log('moveToCurrentSlide');
    return fastdomPromised.measure(() => {
      this.ref.style.transition = `transform 350ms ease-out`;
      this.ref.style.transform = `translateX(0)`;
    });
  }

  swipeToNextSlide() {
    console.log('swipeToNextSlide');
    return fastdomPromised.measure(() => {
      const { next, active } = this.state;
      const move = (active - next) * 100; // percentage
      this.ref.style.transition = `transform 350ms ease-out`;
      this.ref.style.transform = `translateX(${move}%)`;
    });
  }

  moveFromPropsToSlide(x) {
    return fastdomPromised.mutate(() => {
      const { active, previous } = this.state;
      this.ref.style.transition = 'none';
      this.ref.style.transform = `translateX(calc(${100 * (active - previous)}% + ${x}px))`;
    });
  }

  moveSlideContainer() {
    return fastdomPromised.measure(() => {
      this.ref.style.transition = 'none';
      this.ref.style.transform = `translateX(${this.dx}px)`;
    });
  }

  // SLIDES

  updateSlideScrolls() {
    return fastdomPromised.measure(() => {
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

  handleScroll() {
    this.storeCurrentScroll();
  }

  async handleTouchStart(e) {
    const { IDLE, SCROLLING, START } = Swipe;
    const { targetTouches, target } = e;

    const [isHorizontallyScrollable, isScrollBouncing] = await Promise.all([
      Swipe.isHorizontallyScrollable(target),
      Swipe.isScrollBouncing(),
    ]);

    if (this.innerState === IDLE && !isScrollBouncing) {
      const [{ pageX, pageY }] = targetTouches;

      this.initialTouch = { pageX, pageY }; // Store initial touch
      this.storeCurrentScroll(); // Store the current scroll value
      this.setInnerState(isHorizontallyScrollable ? SCROLLING : START); // IDLE => SCROLLING/START
    } else {
      e.preventDefault(); // Ignore event if the state is not IDLE
    }
  }

  handleTouchMove(e) {
    const { START, SWIPING, SCROLLING } = Swipe;
    const [{ pageX, pageY }] = e.targetTouches;
    const { active } = this.state;

    if (this.innerState === START && !this.isMovingHorizontally({ pageX, pageY })) {
      this.setInnerState(SCROLLING);
    } else if (this.innerState === START) {
      e.preventDefault(); // Avoid scroll.
      this.setInnerState(SWIPING); // START => SWIPING
      this.updateSlideScrolls(); // Update scrolls when starts swiping
      this.initialTouch = { pageX, pageY };
    } else if (this.innerState === SWIPING) {
      e.preventDefault(); // Avoid scroll.

      const dxPrev = this.dx;
      this.dx = pageX - this.initialTouch.pageX; // Updates dx value
      // In case you reach the first or the last slide...
      if (this.firstOrLastSlideReached()) {
        // Stops slide container.
        this.dx = 0;
        this.vx = 0;
        this.initialTouch.pageX = pageX;
      } else {
        this.vx = this.vx * 0.5 + (this.dx - dxPrev) * 0.5; // Updates velocity value
      }

      this.moveSlideContainer();
    } else {
      console.log(`DONT MOVE 'cause ${this.innerState}`);
    }
  }

  handleTouchEnd() {
    const { IDLE, START, MOVING, SCROLLING, SWIPING } = Swipe;
    const { onChangeIndex } = this.props;
    if ([START, SCROLLING].includes(this.innerState)) {
      this.setInnerState(IDLE); // START/SCROLLING => IDLE
    } else if (this.innerState === SWIPING) {
      this.setInnerState(MOVING); // SWIPING => MOVING
      // Move to next or to current slide according to next value.
      this.setState({ next: this.nextSlidePosition() }, () => {
        const { next, active } = this.state;
        if (next !== active) {
          // First executes onChangeIndex callback...
          if (typeof onChangeIndex === 'function') onChangeIndex({ index: next, fromProps: false });
          // ... then moves to new slide.
          this.swipeToNextSlide();
        } else if (Math.abs(this.dx) <= 1) {
          this.setInnerState(IDLE); // SWIPING => MOVING => IDLE
          this.stopSlideContainer();
        } else {
          this.moveToCurrentSlide();
        }
      });
    } else {
      console.log(`TOUCH_END IGNORED 'cause ${this.innerState}`);
    }
  }

  handleTransitionEnd({ target }) {
    const { IDLE, MOVING, MOVING_FROM_PROPS } = Swipe;
    const skipFrame = () =>
      window.requestAnimationFrame(() => {
        const { onTransitionEnd } = this.props;
        const { next, active } = this.state;
        const { ref } = this;

        if (ref !== target) return; // Ignores transitionEnd events from children.

        if (this.innerState === MOVING) {
          this.setInnerState(IDLE); // MOVING => IDLE
          if (next === active) return; // If active has not changed, nothing more to do.
          // First executes onTransitionEnd callback...
          if (typeof onTransitionEnd === 'function')
            onTransitionEnd({ index: next, fromProps: false });
          // ... then updates active slide.
          this.updateActiveSlide();
        } else if (this.innerState === MOVING_FROM_PROPS) {
          this.setInnerState(IDLE); // MOVING_FROM_PROPS => IDLE
          this.stopSlideContainer();
        }
      });

    window.requestAnimationFrame(skipFrame);
  }

  changeActiveSlide(next) {
    console.log('changeActiveSlide');
    const { active: previous } = this.state;
    const { onChangeIndex } = this.props;
    const { ref } = this;

    if (typeof onChangeIndex === 'function') onChangeIndex({ index: next, fromProps: true });

    this.setState({ next, active: next, previous }, async () => {
      let x = 0;
      fastdom.measure(() => {
        ({ x } = ref.getBoundingClientRect());
      });

      await Promise.all([
        this.restoreCurrentScroll(),
        this.updateSlideScrolls(),
        this.moveFromPropsToSlide(x),
      ]);

      this.moveToCurrentSlide();
    });
  }

  updateActiveSlide() {
    console.log('updateActiveSlide');
    const { next, active: previous } = this.state;
    this.setState({ active: next, previous }, () => {
      this.restoreCurrentScroll();
      this.updateSlideScrolls();
      this.stopSlideContainer();
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
