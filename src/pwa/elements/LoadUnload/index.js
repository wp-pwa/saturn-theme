import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';

class LoadUnload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.enter = this.enter.bind(this);
    this.leaveTop = this.leaveTop.bind(this);
    this.leaveBottom = this.leaveBottom.bind(this);
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
    if (
      !this.props.once &&
      currentPosition === Waypoint.below &&
      previousPosition === Waypoint.inside
    ) {
      this.setState({ visible: false }, this.props.onLeave);
    }
  }

  leaveBottom({ currentPosition, previousPosition }) {
    if (
      !this.props.once &&
      currentPosition === Waypoint.above &&
      previousPosition === Waypoint.inside
    ) {
      this.setState({ visible: false }, this.props.onLeave);
    }
  }

  render() {
    const { width, height, bottomOffset, topOffset, children, className } = this.props;
    return (
      <div className={className}>
        <Waypoint
          bottomOffset={bottomOffset}
          topOffset={topOffset}
          onEnter={this.enter}
          onLeave={this.leaveTop}
          fireOnRapidScroll={false}
        />
        <div width={width} height={height}>
          {children}
        </div>
        <Waypoint
          topOffset={topOffset}
          bottomOffset={bottomOffset}
          onEnter={this.enter}
          onLeave={this.leaveBottom}
          fireOnRapidScroll={false}
        />
      </div>
    );
  }
}

LoadUnload.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  bottomOffset: PropTypes.number,
  topOffset: PropTypes.number,
  onEnter: PropTypes.func,
  onLeave: PropTypes.func,
  once: PropTypes.bool,
  children: PropTypes.shape({}),
};

export default LoadUnload;
