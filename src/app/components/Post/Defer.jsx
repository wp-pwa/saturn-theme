import { Component, PropTypes } from 'react';

class Defer extends Component {
  constructor() {
    super();

    this.state = {
      isReady: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isReady: true,
      });
    }, this.props.time || 500);
  }

  render() {
    return this.state.isReady ? this.props.children : null;
  }
}

Defer.propTypes = {
  time: PropTypes.number,
  children: PropTypes.shape({}),
};

export default Defer;
