/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { inject } from 'mobx-react';
import { injectGlobal } from 'react-emotion';

// eslint-disable-next-line
injectGlobal`
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: #fff;

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #fff, 0 0 5px #fff;
    opacity: 1.0;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
            transform: rotate(3deg) translate(0px, -4px);
  }

  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: #29d;
    border-left-color: #29d;
    border-radius: 50%;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
            animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @-webkit-keyframes nprogress-spinner {
    0%   { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes nprogress-spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

class Link extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    page: PropTypes.number,
    context: PropTypes.shape({}),
    method: PropTypes.string,
    eventCategory: PropTypes.string,
    eventAction: PropTypes.string,
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    routeChangeRequested: PropTypes.func.isRequired,
    sendEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    page: null,
    method: 'push',
    context: null,
    eventCategory: null,
    eventAction: null,
  };

  constructor() {
    super();

    this.linkClicked = this.linkClicked.bind(this);
  }

  linkClicked(e) {
    // ignore click for new tab / new window behavior
    if (
      e.currentTarget.nodeName === 'A' &&
      (e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        (e.nativeEvent && e.nativeEvent.which === 2))
    )
      return;
    e.preventDefault();
    NProgress.configure({ showSpinner: false });
    NProgress.start();

    const {
      routeChangeRequested,
      sendEvent,
      type,
      id,
      page,
      context,
      method,
      eventCategory,
      eventAction,
    } = this.props;
    setTimeout(() => {
      sendEvent({ category: eventCategory, action: eventAction });

      routeChangeRequested({
        selectedItem: { type, id, page },
        context,
        method,
      });
    }, 100);
  }

  render() {
    const { children, href } = this.props;
    return React.cloneElement(children, { onClick: this.linkClicked, href });
  }
}

export default inject(
  ({ stores: { connection, analytics } }, { type, id, page }) => ({
    href: page
      ? connection.entity(type, id).pagedLink(page)
      : connection.entity(type, id).link,
    routeChangeRequested: connection.routeChangeRequested,
    sendEvent: analytics.sendEvent,
  }),
)(Link);
