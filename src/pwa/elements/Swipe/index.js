/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const scroll = document.scrollingElement.scrollTop;
    const { scrollHeight } = document.scrollingElement;
    const { innerHeight } = window;
    return scroll < 0 || scroll > scrollHeight - innerHeight;
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

    this.state = {
      active: props.index,
      adjust: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    // new methods
    this.moveTo = this.moveTo.bind(this);
    this.updateActiveSlide = this.updateActiveSlide.bind(this);
  }

  componentDidMount() {
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

    if (window) {
      this.innerWidth = window.innerWidth;
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { index } = nextProps;
    const { active } = this.state;
    const { isSwiping, scrolls } = this;

    if (!isSwiping && index >= 0 && index !== active) {
      this.fromProps = true;

      // Restores last scroll for the new slide.
      document.scrollingElement.scrollTop = scrolls[index];

      this.setState({ adjust: true }, () => {
        this.changeActiveSlide(index);
      });
    }
  }

  shouldComponentUpdate(nextProps, { adjust }) {
    return !adjust;
  }

  componentWillUpdate() {
    if (this.isSwiping) return;
    // Updates style for slide container
    this.ref.style.transition = `transform 0ms ease-out`;
    this.ref.style.transform = `none`;
    this.fromProps = false;
    this.isSwiping = false;
  }

  componentWillUnmount() {
    this.ref.removeEventListener('touchstart', this.handleTouchStart);
    this.ref.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    this.scrolls[this.state.active] = document.scrollingElement.scrollTop;
    // this.setState({ adjust: true }, () => this.setState({ adjust: false }));
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
    this.scrolls[this.state.active] = document.scrollingElement.scrollTop;
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

      if (this.isMovingHorizontally) {
        this.setState({ adjust: true }, () => this.setState({ adjust: false }));
      }
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

  handleTouchEnd(e) {
    const { isScrollBouncing } = Swipe;
    // Avoids swipe and scroll when is swiping or bouncing
    if (this.isSwiping || isScrollBouncing()) {
      e.preventDefault();
      return;
    }

    this.preventSwipe = false;

    const next = this.nextSlidePosition();
    const current = this.state.active;

    if (next !== this.state.active) {
      this.moveTo(next);
      this.whenMoveEnds = () => this.updateActiveSlide(next);
    } else {
      this.moveTo(current);
    }

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
    const { onTransitionEnd } = this.props;
    // Ignores transitionEnd events from children.
    if (this.ref !== target) return;

    // Overrides transform property.
    this.ref.style.transition = `transform 0ms ease-out`;
    this.ref.style.transform = `none`;
    // Defers execution of the 'onTransitionEnd' callback.
    if (this.isSwiping) {
      if (onTransitionEnd) setTimeout(onTransitionEnd);
      this.isSwiping = false;
    }

    // Ensures just one execution
    if (typeof this.whenMoveEnds === 'function') {
      this.whenMoveEnds();
      delete this.whenMoveEnds;
    }
  }

  moveTo(next) {
    if (next === this.state.active) {
      if (this.dx) {
        this.isSwiping = true;
        this.ref.style.transition = `transform 350ms ease-out`;
        this.ref.style.transform = `translateX(0)`;
      } else {
        this.isSwiping = false;
        this.ref.style.transition = `transform 0ms ease-out`;
        this.ref.style.transform = 'none';
      }
    } else {
      const { onChangeIndex } = this.props;
      this.isSwiping = true;
      if (onChangeIndex) onChangeIndex({ index: next, fromProps: false });

      const { active } = this.state;
      const move = (active - next) * 100; // percentage

      this.ref.style.transition = `transform 350ms ease-out`;
      this.ref.style.transform = this.dx ? `translateX(${move}%)` : 'none';
    }
  }

  handleSelect({ target }) {
    this.setState({ adjust: true }, () => {
      this.changeActiveSlide(parseInt(target.value, 10));
    });
  }

  changeActiveSlide(next) {
    const { dx } = this;
    const { active } = this.state;
    const { onChangeIndex } = this.props;
    this.isSwiping = true;
    if (onChangeIndex) onChangeIndex({ index: next, fromProps: this.fromProps });

    this.ref.style.transition = `transform 0ms ease-out`;
    this.ref.style.transform = `translateX(calc(${100 * (next - active)}% + ${dx}px))`;
    document.scrollingElement.scrollTop = this.scrolls[next];

    this.setState({ active: next, adjust: false }, () => {
      this.ref.style.transition = `transform 350ms ease-out`;
      this.ref.style.transform = `translateX(0)`;
      this.fromProps = false;
    });
  }

  updateActiveSlide(next) {
    this.setState({ active: next }, () => {
      document.scrollingElement.scrollTop = this.scrolls[next];
    });
  }

  render() {
    const { active } = this.state;
    const { scrolls } = this;
    const { container, limiter, list } = Swipe;

    const children = React.Children.map(this.props.children, (child, i) => {
      scrolls[i] = scrolls[i] || 0; // init scrolls of new children
      const slideStyle = {
        width: '100%',
        display: 'inline-block',
        left: `${100 * (i - active)}%`,
        position: i !== active ? 'absolute' : 'relative',
        transform: i !== active ? `translateY(${scrolls[active] - scrolls[i]}px)` : 'none',
      };

      return (
        <div className="slide" style={slideStyle} key={i}>
          <child.type {...child.props} />
        </div>
      );
    });

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
