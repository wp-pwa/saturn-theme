import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { inject } from 'mobx-react';
import Lazy from '@frontity/lazyload';

class LazyAnimated extends Component {
  static noAnimate = 'NO_ANIMATE';
  static onMount = 'ON_MOUNT';
  // static onLoad = 'ON_LOAD'; // not supported

  static propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isSsr: PropTypes.bool.isRequired,
    ignoreSsr: PropTypes.bool,
    onContentVisible: PropTypes.func,
    animate: PropTypes.oneOf([
      LazyAnimated.noAnimate,
      LazyAnimated.onMount,
      LazyAnimated.onLoad,
    ]),
  };

  static defaultProps = {
    ignoreSsr: false,
    onContentVisible: null,
    animate: LazyAnimated.noAnimate,
  };

  constructor(props) {
    super(props);
    const { isSsr, ignoreSsr, animate } = props;
    this.state = {
      visible: (isSsr && !ignoreSsr) || animate === LazyAnimated.noAnimate,
      isSsr: isSsr && !ignoreSsr,
    };
    this.show = this.show.bind(this);
    this.delayShow = this.delayShow.bind(this);
    this.onContentVisible = this.onContentVisible.bind(this);
  }

  componentDidMount() {
    const { visible, isSsr } = this.state;
    if (visible && isSsr) this.onContentVisible();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameId);
  }

  onContentVisible() {
    const { animate, onContentVisible } = this.props;
    if (animate === LazyAnimated.onMount) this.delayShow();
    if (onContentVisible) onContentVisible();
  }

  show() {
    this.setState({ visible: true });
  }

  delayShow() {
    this.animationFrameId = window.requestAnimationFrame(this.show);
  }

  render() {
    const {
      className,
      onContentVisible: _onContentVisible,
      children,
      animate: _animate,
      ...lazyProps
    } = this.props;
    const { visible, isSsr } = this.state;

    const Element = lazyProps.elementType || 'div';

    return isSsr ? (
      <Element className={`LazyLoad is-visible ${className}`}>
        <Container visible={visible}>{children}</Container>
      </Element>
    ) : (
      <Lazy
        className={className}
        onContentVisible={this.onContentVisible}
        {...lazyProps}
      >
        <Fragment>
          <Container visible={visible}>{children}</Container>
        </Fragment>
      </Lazy>
    );
  }
}

export default inject(({ stores: { build } }) => ({
  isSsr: build.isSsr,
}))(LazyAnimated);

const Container = styled.div`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.transitionTime};
  height: 100%;
  width: 100%;
`;
