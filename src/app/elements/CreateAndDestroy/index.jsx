import React, { PropTypes } from 'react';

class CreateAndDestroy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { visible, createTime, destroyTime } = this.props;
    const { nextVisible } = nextProps;
    const { nextActive } = nextState;

    if (!visible && nextVisible) {
      setTimeout(this.setState({ active: true }, createTime));
    }

    if (visible && !nextVisible) {
      setTimeout(this.setState({ active: false }, destroyTime));
    }

    if (visible && nextActive) return true;
    if (!visible && !nextActive) return true;

    return false;
  }

  render() {
    const { visible, width, height, className, children } = this.props;
    const { active } = this.state;
    return (
      visible && active ?
        <div className={className} width={width} height={height}>
          {children}
        </div>
      : null
    );
  }
}

CreateAndDestroy.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  createTime: PropTypes.number,
  destroyTime: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.shape({}),
};

export default CreateAndDestroy;
