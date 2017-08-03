/* eslint-disable no-undef, jsx-a11y/no-static-element-interactions */
import { isCordova } from 'worona-deps';
import React from 'react';
import { connect } from 'react-redux';
import urllite from 'urllite';
import * as deps from '../../deps';

class CaptureLinks extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    // Get the <a> element.
    let el = e.target;
    while (el && el.nodeName !== 'A') {
      el = el.parentNode;
    }

    // Ignore clicks from non-a elements.
    if (!el) {
      return;
    }

    // Use a regular expression to parse URLs instead of relying on the browser
    // to do it for us (because IE).
    const linkUrl = urllite(el.href);
    const siteUrl = urllite(this.props.siteUrl);

    // Remove blur.
    el.blur();

    // Ignore canceled events, modified clicks, and right clicks.
    if (e.defaultPrevented) {
      return;
    }

    if (linkUrl.host !== siteUrl.host) {
      if (isCordova && device.platform === 'Android') {
        e.preventDefault();
        navigator.app.loadUrl(el.href, { openExternal: true });
      } else if (isCordova && device.platform === 'iOS') {
        e.preventDefault();
        window.open(el.href, '_system');
      } else {
        return;
      }
    } else {
      e.preventDefault();
      this.props.deepUrlVisited({ url: el.href });
    }
  }

  render() {
    return <div onClick={this.onClick}>{this.props.children}</div>;
  }
}
CaptureLinks.propTypes = {
  siteUrl: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
  deepUrlVisited: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  siteUrl: deps.selectorCreators.getSetting('generalSite', 'url')(state),
});

const mapDispatchToProps = dispatch => ({
  deepUrlVisited: ({ url }) => dispatch(deps.actions.deepUrlVisited({ url })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CaptureLinks);
