import React, { PropTypes } from 'react';
import Waypoint from 'react-waypoint';

class CustomLazyLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      top: false,
      bottom: false,
    };
    this.enter = this.enter.bind(this);
    this.leaveTop = this.leaveTop.bind(this);
    this.leaveBottom = this.leaveBottom.bind(this);
    this.checkIfVisible = this.checkIfVisible.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  enter() {
    const { visible } = this.state;
    if (!visible) {
      this.setState({ visible: true }, this.props.onEnter);
    }
  }

  leaveTop({ currentPosition, previousPosition }) {
    if (currentPosition === Waypoint.below && previousPosition === Waypoint.inside) {
      this.setState({ visible: false }, this.props.onLeave);
    }
  }

  leaveBottom({ currentPosition, previousPosition }) {
    if (currentPosition === Waypoint.above && previousPosition === Waypoint.inside) {
      this.setState({ visible: false }, this.props.onLeave);
    }
  }

  checkIfVisible() {
    const { visible, top, bottom } = this.state;
    const visibleNow = top || bottom;
    if (visible === visibleNow) return;
    if (visibleNow) this.props.onEnter();
    else this.props.onLeave();
    this.setState({ visible: visibleNow });
  }

  render() {
    const { width, height, bottomOffset, topOffset, children } = this.props;
    return (
      <div>
        <Waypoint
          bottomOffset={bottomOffset}
          topOffset={topOffset}
          onEnter={this.enter}
          onLeave={this.leaveTop}
        />
        <div width={width} height={height}>
          {children}
        </div>
        <Waypoint
          topOffset={topOffset}
          bottomOffset={bottomOffset}
          onEnter={this.enter}
          onLeave={this.leaveBottom}
        />
      </div>
    );
  }
}

CustomLazyLoad.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  bottomOffset: PropTypes.number,
  topOffset: PropTypes.number,
  onEnter: PropTypes.func,
  onLeave: PropTypes.func,
  children: PropTypes.shape({}),
};

export default CustomLazyLoad;
