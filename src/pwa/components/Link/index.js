/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { inject } from 'mobx-react';

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
