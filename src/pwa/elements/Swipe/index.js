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
  static listStyle = {
    minHeight: '100vh',
  };

  static limiterStyle = {
    width: 'auto',
    height: 'auto',
    position: 'relative',
    overflow: 'hidden',
  };

  static containerStyle = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  };

  static slideStyle = {
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

  // STATES - Possible transitions:
  // IDLE => START => SWIPING => MOVING => IDLE
  // IDLE => SCROLLING => IDLE
  // IDLE => START => IDLE
  // (ANY) => MOVING_FROM_PROPS => IDLE
  static IDLE = 'IDLE';
  static START = 'START';
  static SCROLLING = 'SCROLLING';
  static SWIPING = 'SWIPING';
  static MOVING = 'MOVING';
  static MOVING_FROM_PROPS = 'MOVING_FROM_PROPS';

  constructor(props) {
    super(props);
    const { index } = props;

    // Server side rendering
    this.ssr = true;

    // Array with the scroll value of each slide
    this.scrolls = Array(props.children.length).fill(0);

    this.initialTouch = {};

    this.dx = 0;
    this.vx = 0;
    this.velocityThreshold = 5; // for velocity [value is (dx(n) - dx(n-1))/2 (pixels/tick)]

    // innerState
    this.innerState = Swipe.IDLE;

    // React state
    this.state = { next: index, active: index, previous: index };

    // Event handlers
    this.handleScroll = this.handleScroll.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

    // Methods that update active
    this.updateActiveSlide = this.updateActiveSlide.bind(this);
    this.changeActiveSlide = this.changeActiveSlide.bind(this);

    // Helpers
    this.getSlidePosition = this.getSlidePosition.bind(this);

    // Methods that use fastdom:
    // -- measure
    this.isMovingHorizontally = this.isMovingHorizontally.bind(this);
    this.firstOrLastSlideReached = this.firstOrLastSlideReached.bind(this);
    this.storeCurrentScroll = this.storeCurrentScroll.bind(this);
    // -- mutate
    this.restoreCurrentScroll = this.restoreCurrentScroll.bind(this);
    this.stopSlideContainer = this.stopSlideContainer.bind(this);
    this.moveToCurrentSlide = this.moveToCurrentSlide.bind(this);
    this.moveFromPropsToSlide = this.moveFromPropsToSlide.bind(this);
    this.swipeToNextSlide = this.swipeToNextSlide.bind(this);
    this.moveSlideContainer = this.moveSlideContainer.bind(this);
    this.updateNonActiveScrolls = this.updateNonActiveScrolls.bind(this);
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.ssr = false;
    }
  }

  async componentDidMount() {
    if (typeof window === 'undefined') return;

    // Gets scrolling element.
    if (!Swipe.scrollingElement) Swipe.scrollingElement = await getScrollingElement();

    // Initialize scroll for all slides.
    await this.updateNonActiveScrolls(this.state.active);

    // Gets the innerWidth...
    this.innerWidth = await fastdomPromised.measure(() => window.innerWidth);

    // Adds event listeners
    window.addEventListener('scroll', this.handleScroll);
    this.ref.addEventListener('touchstart', this.handleTouchStart, {
      passive: false,
      capture: true,
    });
    this.ref.addEventListener('touchmove', this.handleTouchMove, {
      passive: false,
    });
  }

  componentWillReceiveProps({ index, children }) {
    const { MOVING_FROM_PROPS } = Swipe;
    const { next, active } = this.state;

    if (index < 0 || index >= children.length) return; // Ignore invalid Index
    if (index === next) return; // Ignore changes to same Index

    this.setInnerState(MOVING_FROM_PROPS);

    if (index === active) {
      // Go back to current slide if index is active
      this.setState({ next: index }, () => {
        this.moveToCurrentSlide();
      });
    } else {
      this.changeActiveSlide(index);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { children } = this.props;
    const { active } = this.state;
    return children !== nextProps.children || active !== nextState.active;
  }

  componentWillUnmount() {
    this.ref.removeEventListener('touchstart', this.handleTouchStart);
    this.ref.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('scroll', this.handleScroll);
  }

  setInnerState(newState) {
    // console.log(`${this.innerState} => ${newState}`);
    this.innerState = newState;
  }

  getSlidePosition(i) {
    const { active } = this.state;
    const { scrolls } = this;

    scrolls[i] = scrolls[i] || 0; // Inits scroll if required

    const position = i !== active ? 'absolute' : 'relative';
    const transform =
      i !== active
        ? `translate(${100 * (i - active)}%, ${scrolls[active] - scrolls[i]}px)`
        : 'none';

    return { position, transform };
  }

  storeCurrentScroll() {
    return fastdomPromised.measure(() => {
      const { active } = this.state;
      this.scrolls[active] = Swipe.scrollingElement.scrollTop;
    });
  }

  restoreCurrentScroll() {
    return fastdomPromised.mutate(() => {
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

  nextSlidePosition() {
    const { children, threshold } = this.props;
    const { active } = this.state;

    const last = children.length - 1;

    // Position or velocity that triggers a slide change
    let movement = 0;
    if (Math.abs(this.vx) > this.velocityThreshold) {
      movement = Math.sign(Math.sign(this.vx) + Math.sign(this.dx)); // velocity reached
    } else if (Math.abs(this.dx) > this.innerWidth * threshold) {
      movement = Math.sign(this.dx); // displacement
    }

    let next = active - movement;

    // Fixes an invalid index
    if (next < 0) next = 0;
    else if (next > last) next = last;

    return next;
  }

  stopSlideContainer() {
    return fastdomPromised.mutate(() => {
      this.ref.style.transition = 'none';
      this.ref.style.transform = 'none';
    });
  }

  moveToCurrentSlide() {
    return fastdomPromised.mutate(() => {
      this.ref.style.transition = `transform 350ms ease-out`;
      this.ref.style.transform = `translateX(0)`;
    });
  }

  swipeToNextSlide() {
    return fastdomPromised.mutate(() => {
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
    return fastdomPromised.mutate(() => {
      this.ref.style.transition = 'none';
      this.ref.style.transform = `translateX(${this.dx}px)`;
    });
  }

  updateNonActiveScrolls() {
    return fastdomPromised.mutate(() => {
      if (!this.ref) return;

      Array.from(this.ref.children).forEach(({ style }, i) => {
        const { position, transform } = this.getSlidePosition(i);
        style.position = position;
        style.transform = transform;
      });
    });
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
    } else if (e.cancelable) {
      e.preventDefault(); // Ignore event if the state is not IDLE (and it is cancelable)
    }
  }

  handleTouchMove(e) {
    const { START, SWIPING, SCROLLING, MOVING, MOVING_FROM_PROPS } = Swipe;
    const [{ pageX, pageY }] = e.targetTouches;

    if (this.innerState === START) {
      if (!e.cancelable || !this.isMovingHorizontally({ pageX, pageY })) {
        this.setInnerState(SCROLLING); // non-cancelable => SCROLLING
        return;
      }
      e.preventDefault(); // Avoid scroll.
      this.setInnerState(SWIPING); // START => SWIPING
      this.updateNonActiveScrolls(); // Update scrolls when starts swiping
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
    } else if ([MOVING, MOVING_FROM_PROPS].includes(this.innerState)) {
      e.preventDefault(); // Ignore scroll events while moving the slide container.
    } else {
      // console.log(`DONT MOVE 'cause ${this.innerState}`);
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
      // console.log(`TOUCH_END IGNORED 'cause ${this.innerState}`);
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
    const { active: previous } = this.state;
    const { onChangeIndex } = this.props;
    const { ref } = this;

    if (typeof onChangeIndex === 'function') onChangeIndex({ index: next, fromProps: true });

    this.setState({ next, active: next, previous }, async () => {
      // Gets the horizontal displacement that the slide container's currently got.
      // The value is obtained this way because it's needed during this tick of the event loop.
      let x = 0;
      fastdom.measure(() => {
        ({ x } = ref.getBoundingClientRect());
      });

      this.updateNonActiveScrolls(); // First update scrolls of non-active slides,
      this.restoreCurrentScroll(); // then restore the scroll of the active one.

      await this.moveFromPropsToSlide(x);

      this.moveToCurrentSlide();
    });
  }

  updateActiveSlide() {
    const { next, active: previous } = this.state;
    this.setState({ active: next, previous }, () => {
      this.updateNonActiveScrolls(); // First update scrolls of non-active slides,
      this.restoreCurrentScroll(); // then restore the scroll of the active one.
      this.stopSlideContainer();
    });
  }

  render() {
    const { containerStyle, limiterStyle, listStyle, slideStyle } = Swipe;
    const children = React.Children.map(this.props.children, (child, i) => {
      // Set slides position if server side rendering.
      const style = this.ssr ? { ...slideStyle, ...this.getSlidePosition(i) } : slideStyle;
      return (
        <div key={i} style={style} suppressHydrationWarning>
          <child.type {...child.props} />
        </div>
      );
    });

    return (
      <div style={containerStyle}>
        <div style={limiterStyle}>
          <div
            style={listStyle}
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
