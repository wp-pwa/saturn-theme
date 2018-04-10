import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Lazy from 'react-lazy-fastdom';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';

class LazyAnimated extends Component {
  static noAnimate = 'NO_ANIMATE';
  static onMount = 'ON_MOUNT';
  static onLoad = 'ON_LOAD'; // not tested

  static propTypes = {
    children: PropTypes.node.isRequired,
    isSsr: PropTypes.bool.isRequired,
    onContentVisible: PropTypes.func,
    animate: PropTypes.oneOf([LazyAnimated.noAnimate, LazyAnimated.onMount, LazyAnimated.onLoad]),
  };

  static defaultProps = {
    onContentVisible: null,
    animate: LazyAnimated.noAnimate,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: props.isSsr || props.animate === LazyAnimated.noAnimate,
      isSsr: props.isSsr,
    };
    this.show = this.show.bind(this);
    this.delayShow = this.delayShow.bind(this);
    this.onContentVisible = this.onContentVisible.bind(this);
  }

  componentDidMount() {
    const { visible, isSsr } = this.state;
    if (visible && isSsr) this.onContentVisible();
  }

  shouldComponentUpdate() {
    return !this.state.visible;
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

    if (animate === LazyAnimated.onLoad) {
      children.props.onLoad = this.delayShow;
    }

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
  transition: opacity 300ms;
  height: 100%;
`;
