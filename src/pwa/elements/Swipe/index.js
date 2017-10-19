/* global document */ /* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const hasOverflowX = element =>
  ['auto', 'scroll'].includes(window.getComputedStyle(element).overflowX);

const isScrollableX = element =>
  element.getBoundingClientRect().width < element.scrollWidth && hasOverflowX(element);

const parentScrollableX = element =>
  element !== null && (isScrollableX(element) || parentScrollableX(element.parentElement));

const isMovingHorizontally = (pos, prevPos) =>
  Math.abs(pos.pageX - prevPos.pageX) > Math.abs(pos.pageY - prevPos.pageY);

// STYLES

const slide = ({ index, active }) => ({
  width: '100%',
  display: 'inline-block',
  position: index === active ? 'relative' : 'absolute',
  left: `${100 * (index - active)}%`,
});


const list = {
  minHeight: '100vh',
};

const limiter = {
  width: 'auto',
  height: 'auto',
  position: 'relative',
  overflow: 'hidden',
};

const container = {
  width: '100%',
  height: '100%',
  overflowX: 'hidden',
};

const select = {
  position: 'fixed',
  bottom: '10px',
  right: '10px',
  zIndex: '9999',
};

class Swipe extends Component {
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
    this.threshold = 5; // arbitrary value

    this.state = {
      active: props.index,
      adjust: false,
    };

    this.slideStyles = Array(props.children.length)
      .fill(0)
      .map((e, index) => slide({ index, active: this.state.active }));

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    // React does not let you add a non-passive event listener...
    if (this.ref) {
      this.ref.addEventListener('touchmove', this.handleTouchMove, {
        passive: false,
      });
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { index } = nextProps;
  //   const { active } = this.state;
  //   const { isSwiping, scrolls } = this;
  //
  //   console.log('willReceiveProps');
  //
  //   if (!isSwiping && index !== active) {
  //     console.log('index changed using props');
  //     scrolls[active] = document.scrollingElement.scrollTop;
  //     this.adjustChildrenPositions(active);
  //     setTimeout(this.changeActiveSlide(index));
  //   }
  // }

  shouldComponentUpdate(nextProps, { adjust }) {
    return !adjust;
  }

  componentWillUnmount() {
    this.ref.removeEventListener('touchmove', this.handleTouchMove);
  }

  handleTouchStart({ targetTouches, target }) {
    this.initialTouch.pageX = targetTouches[0].pageX;
    this.initialTouch.pageY = targetTouches[0].pageY;
    this.preventSwipe = parentScrollableX(target);
    this.scrolls[this.state.active] = document.scrollingElement.scrollTop;
  }

  handleTouchMove(e) {
    const currentTouch = e.targetTouches[0];

    if (!this.isMoving && !this.preventSwipe && !this.isSwiping) {
      this.isMoving = true;
      this.isMovingHorizontally = isMovingHorizontally(currentTouch, this.initialTouch);
      this.initialTouch.pageX = currentTouch.pageX;
      this.initialTouch.pageY = currentTouch.pageY;

      if (this.isMovingHorizontally) this.adjustChildrenPositions(this.state.active);
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
        this.ref.style.transition = `transform 0ms cubic-bezier(0.15, 0.3, 0.25, 1)`;
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

    // Overrides transform property.
    this.ref.style.transform = `none`;
    // Defers execution of the 'onTransitionEnd' callback.
    if (this.isSwiping) {
      if (onTransitionEnd) setTimeout(onTransitionEnd);
      this.isSwiping = false;
    }
  }

  handleSelect({ target }) {
    this.scrolls[this.state.active] = document.scrollingElement.scrollTop;
    this.adjustChildrenPositions(this.state.active);
    setTimeout(this.changeActiveSlide(parseInt(target.value, 10)));
  }

  returnToCurrentSlide() {
    this.ref.style.transition = `transform 350ms cubic-bezier(0.15, 0.3, 0.25, 1)`;
    this.ref.style.transform = this.dx ? `translateX(0)` : 'none';
  }

  changeActiveSlide(next) {
    const { dx } = this;
    const { active } = this.state;
    const { onChangeIndex } = this.props;

    this.isSwiping = true;

    this.adjustChildrenPositions(next);
    this.ref.style.transition = `transform 0ms ease-out`;
    this.ref.style.transform = `translateX(calc(${100 * (next - active)}% + ${dx}px))`;
    document.scrollingElement.scrollTop = this.scrolls[next];

    this.setState({ active: next }, () => {
      this.ref.style.transition = `transform 350ms cubic-bezier(0.15, 0.3, 0.25, 1)`;
      this.ref.style.transform = `translateX(0)`;
      if (onChangeIndex) onChangeIndex(this.state.active);
    });
  }

  adjustChildrenPositions(active) {
    const { slideStyles, scrolls } = this;

    for (let i = 0; i < slideStyles.length; i += 1) {
      const style = slideStyles[i];
      const left = `${100 * (i - active)}%`;
      const position = i !== active ? 'absolute' : 'relative';
      const transform = i !== active ? `translateY(${scrolls[active] - scrolls[i]}px)` : 'none';

      slideStyles[i] = Object.assign({ ...style }, { position, transform, left });
    }

    this.setState({ adjust: true }, () => this.setState({ adjust: false }));
  }

  render() {
    console.log('render SWIPE');
    const children = React.Children.map(this.props.children, (child, index) =>
      <div className={'slide'} style={this.slideStyles[index]} index={index} key={index}>
        <child.type {...child.props} />
      </div>
    );

    const options = React.Children.map(this.props.children, (child, index) => (
      <option value={index}>{index + 1}</option>
    ));

    return (
      <div style={container}>
        <div style={limiter}>
          <div style={list}
            onTouchStartCapture={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
            onTransitionEnd={this.handleTransitionEnd}
            ref={ref => {
              this.ref = ref;
            }}
          >
            {children}
          </div>
        </div>
        <select style={select} onChange={this.handleSelect} value={this.state.active}>
          {options}
        </select>
      </div>
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
