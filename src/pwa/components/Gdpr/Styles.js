/* eslint-disable no-underscore-dangle, prefer-rest-params  */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cx, css } from 'react-emotion';
import { dep } from 'worona-deps';
import { getThemeProps } from '../../../shared/helpers';

const hidden = css`
  display: none;
`;

const getStyle = theme => css`
  .qc-cmp-ui-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Droid Sans',
      'Helvetica Neue', Helvetica, Arial, sans-serif;
    align-items: flex-end;
    background-color: rgba(33, 41, 52, 0.5);
    overflow: auto;
    width: 100vw;

    .qc-cmp-ui {
      margin: 0;
      max-height: 100vh;
      max-width: 100vw;

      .qc-cmp-button {
        background-color: ${theme.colors.link};
        border-color: ${theme.colors.link};
      }

      .qc-cmp-button:focus {
        color: #fff;
      }

      .qc-cmp-secondary-button {
        background-color: transparent;
        color: ${theme.colors.link};
      }

      .qc-cmp-secondary-button:focus {
        color: ${theme.colors.link};
      }

      .qc-cmp-alt-action {
        color: ${theme.colors.link};
      }

      .qc-cmp-toggle-status {
        color: ${theme.colors.link};
      }

      .qc-cmp-toggle-on {
        background-color: ${theme.colors.link};
        border-color: ${theme.colors.link};
      }

      .qc-cmp-nav-bar {
        position: absolute;
        left: 0;
        background-color: #fff;
        z-index: 100;

        .qc-cmp-nav-bar-publisher-logo-container {
          display: none !important;
        }

        .qc-cmp-alt-action {
          line-height: 56px;
          padding-left: 0;
          display: flex;
          align-items: center;
        }

        .qc-cmp-alt-action::before {
          display: flex;
          position: static;
          margin-right: 5px;
        }

        .qc-cmp-cancel {
          display: flex;
          justify-content: flex-end;
          margin-left: 0;
        }

        .qc-cmp-button {
          margin: 20px auto;
        }
      }

      .qc-cmp-top {
        top: 0;
      }

      .qc-cmp-bottom {
        bottom: 0;
      }

      .qc-cmp-ui-content {
        padding: 30px 30px 0 30px;
      }

      .qc-cmp-purposes-page-content {
        padding: 100px 20px 170px 20px;
        max-height: 100%;
        height: 100%;
        -webkit-overflow-scrolling: touch;
      }

      .qc-cmp-alt-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 56px;
        padding: 0;
      }

      .qc-cmp-qc-link-container {
        display: none !important;
      }

      .qc-cmp-vendor-list-container {
        overflow: auto;
      }

      .qc-cmp-all-vendors-list {
        height: auto;
      }

      .qc-cmp-partner-info {
        padding: 100px 20px 170px 20px;
        margin: 0;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
  }
`;

class GdprStyles extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
    isSsr: PropTypes.bool.isRequired,
    gdprPwa: PropTypes.bool,
    gdprPublisherName: PropTypes.string,
    gdprLanguage: PropTypes.string,
  };

  static defaultProps = {
    gdprPwa: null,
    gdprPublisherName: null,
    gdprLanguage: null,
  };

  constructor(props) {
    super(props);
    this.modalStyles = getStyle(getThemeProps(props.mainColor));
    this.addGdprScript = this.addGdprScript.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Adds the class generated before to body
    if (prevProps.isSsr !== this.props.isSsr) {
      this.addGdprScript();
    }
  }

  addGdprScript() {
    const { gdprPwa, gdprPublisherName, gdprLanguage } = this.props;

    if (!gdprPwa) return;

    const elem = document.createElement('script');
    elem.src = 'https://quantcast.mgr.consensu.org/cmp.js';
    elem.async = true;
    elem.type = 'text/javascript';
    elem.addEventListener('load', () => {
      window.__cmp('init', {
        Language: gdprLanguage,
        'Publisher Name': gdprPublisherName,
        'Publisher Purpose IDs': [1, 2, 3, 4, 5],
        'Min Days Between UI Displays': 30,
        'No Option': false,
      });
      window.document.body.classList.add(this.modalStyles);
    });

    const scpt = document.getElementsByTagName('script')[0];
    scpt.parentNode.insertBefore(elem, scpt);

    const gdprAppliesGlobally = false;

    function addFrame() {
      if (!window.frames.__cmpLocator) {
        if (document.body) {
          const iframe = document.createElement('iframe');
          iframe.style.cssText = 'display: none;';
          iframe.name = '__cmpLocator';
          document.body.appendChild(iframe);
        } else {
          // In the case where this stub is located in the head,
          // this allows us to inject the iframe more quickly than
          // relying on DOMContentLoaded or other events.
          setTimeout(addFrame, 5);
        }
      }
    }

    addFrame();

    function cmpMsgHandler(event) {
      const msgIsString = typeof event.data === 'string';

      let json;

      if (msgIsString) {
        json = event.data.indexOf('__cmpCall') !== -1 ? JSON.parse(event.data) : {};
      } else {
        json = event.data;
      }

      if (json.__cmpCall) {
        const i = json.__cmpCall;
        window.__cmp(i.command, i.parameter, (retValue, success) => {
          const returnMsg = {
            __cmpReturn: {
              returnValue: retValue,
              success,
              callId: i.callId,
            },
          };
          event.source.postMessage(msgIsString ? JSON.stringify(returnMsg) : returnMsg, '*');
        });
      }
    }

    window.__cmp = function __cmp(c) {
      const b = arguments;

      if (!b.length) return window.__cmp.a;
      else if (b[0] === 'ping') {
        b[2](
          {
            gdprAppliesGlobally,
            cmpLoaded: false,
          },
          true,
        );
      } else if (c === '__cmp') return false;
      else {
        if (typeof window.__cmp.a === 'undefined') window.__cmp.a = [];
        window.__cmp.a.push([].slice.apply(b));
      }

      return null;
    };

    window.__cmp.gdprAppliesGlobally = gdprAppliesGlobally;
    window.__cmp.msgHandler = cmpMsgHandler;

    if (window.addEventListener) window.addEventListener('message', cmpMsgHandler, false);
    else window.attachEvent('onmessage', cmpMsgHandler);
  }

  render() {
    return (
      <Fragment>
        <span className={cx(hidden, this.modalStyles)} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const gdpr = dep('settings', 'selectorCreators', 'getSetting')('theme', 'gdpr')(state) || {};

  return {
    mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state),
    isSsr: dep('build', 'selectors', 'getSsr')(state),
    gdprPwa: gdpr.pwa,
    gdprPublisherName: gdpr.publisherName,
    gdprLanguage: gdpr.language,
  };
};

export default connect(mapStateToProps)(GdprStyles);
