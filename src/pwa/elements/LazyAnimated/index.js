import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Lazy from 'react-lazy-fastdom';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';

class LazyAnimated extends Component {
  static noAnimate = 'NO_ANIMATE';
  static onMount = 'ON_MOUNT';
  static onLoad = 'ON_LOAD'; // not supported

  static propTypes = {
    children: PropTypes.node.isRequired,
    isSsr: PropTypes.bool.isRequired,
    ignoreSsr: PropTypes.bool,
    onContentVisible: PropTypes.func,
    animate: PropTypes.oneOf([LazyAnimated.noAnimate, LazyAnimated.onMount, LazyAnimated.onLoad]),
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
    const { onContentVisible: _, children, animate, ...lazyProps } = this.props;
    const { visible, isSsr } = this.state;

    const Element = lazyProps.elementType || 'div';

    const container = () => <Container visible={visible}>{children}</Container>;
    return isSsr ? (
      <Element className="LazyLoad is-visible">{container()}</Element>
    ) : (
      <Lazy onContentVisible={this.onContentVisible} {...lazyProps}>
        <Fragment>{container()}</Fragment>
      </Lazy>
    );
  }
}

const mapStateToProps = state => ({
  isSsr: dep('build', 'selectors', 'getSsr')(state),
});

export default connect(mapStateToProps)(LazyAnimated);

const Container = styled.div`
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: opacity 100ms;
  height: 100%;
`;
