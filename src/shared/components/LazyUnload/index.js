import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lazy from 'react-lazy-load';

class LazyUnload extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    minTime: PropTypes.number.isRequired,
    maxTime: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  }

  static randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  constructor(props) {
    super(props);
    this.state = { dying: false };
  }

  componentWillReceiveProps(nextProps) {
    const { active, minTime, maxTime } = this.props;
    const { dying } = this.state;
    if (active && !nextProps.active) {
      this.setState({ dying: true });
      this.countdown = setTimeout(() => {
        this.setState({ dying: false });
      }, LazyUnload.randomBetween(minTime, maxTime));
    }

    if (!active && nextProps.active && dying) {
      clearTimeout(this.countdown);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.countdown);
  }

  render() {
    const { width, height, active, offset, children, className } = this.props;
    const { dying } = this.state;

    return (
      (active || dying) && (
        <Lazy
          height={height}
          width={width}
          offsetVertical={offset}
          debounce={false}
          className={className}
        >
          {children}
        </Lazy>
      )
    );
  }
}

export default LazyUnload;
