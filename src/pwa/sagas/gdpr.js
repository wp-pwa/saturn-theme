/*
  eslint-disable
  no-console,
  no-underscore-dangle,
  prefer-rest-params
*/

import { select } from 'redux-saga/effects';
import { dep } from 'worona-deps';

export default function* gdprSagas() {
  const getSetting = dep('settings', 'selectorCreators', 'getSetting');
  const gdprSettings = (yield select(getSetting('theme', 'gdpr'))) || {};

  if (!gdprSettings.pwa) return;

  const elem = document.createElement('script');
  elem.src = 'https://quantcast.mgr.consensu.org/cmp.js';
  elem.async = true;
  elem.type = 'text/javascript';
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

  window.__cmp('init', {
    Language: gdprSettings.language,
    'Publisher Name': gdprSettings.publisherName,
    'Publisher Purpose IDs': [1, 2, 3, 4, 5],
    'Min Days Between UI Displays': 30,
    'No Option': false,
  });
}
