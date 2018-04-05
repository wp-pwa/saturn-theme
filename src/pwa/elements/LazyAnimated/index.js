import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Lazy from 'react-lazy-fastdom';
import { noop } from 'lodash';

class LazyAnimated extends Component {
  static noAnimate = 'NO_ANIMATE';
  static onMount = 'ON_MOUNT';
  static onLoad = 'ON_LOAD'; // not tested

  static propTypes = {
    children: PropTypes.node.isRequired,
    animate: PropTypes.oneOf([
      LazyAnimated.noAnimate,
      LazyAnimated.onMount,
      LazyAnimated.onLoad,
    ]),
  };

  static defaultProps = {
    animate: LazyAnimated.noAnimate,
  };

  constructor(props) {
    super(props);
    this.state = { visible: props.animate === LazyAnimated.noAnimate };
    this.show = this.show.bind(this);
    this.delayShow = this.delayShow.bind(this);
  }

  shouldComponentUpdate() {
    return !this.state.visible;
  }

  show() {
    this.setState({ visible: true });
  }

  delayShow() {
    window.requestAnimationFrame(this.show);
  }

  render() {
    const { children, animate, ...lazyProps } = this.props;
    const { visible } = this.state;

    if (animate === LazyAnimated.onLoad) {
      children.props.onLoad = this.delayShow;
    }

    return (
      <Lazy
        onContentVisible={animate === LazyAnimated.onMount ? this.delayShow : noop}
        {...lazyProps}
      >
        <Fragment>
          <Container visible={visible}>{children}</Container>
        </Fragment>
      </Lazy>
    );
  }
}

export default LazyAnimated;

const Container = styled.div`
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: opacity 300ms;
`;
