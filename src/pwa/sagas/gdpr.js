/* eslint-disable no-console */
import { call, select } from 'redux-saga/effects';
import { dep } from 'worona-deps';

export default function* gdprSagas() {
  const getSetting = dep('settings', 'selectorCreators', 'getSetting');
  const gdprSettings = (yield select(getSetting('theme', 'gdpr'))) || {};

  if (!gdprSettings.pwa) return;

  // window.cmpLang2 = {
  //   en: {
  //     Language: 'en',
  //     'Initial Screen Reject Button Text': 'I do not accept',
  //     'Initial Screen Accept Button Text': 'I accept',
  //     'Purpose Screen Header Title Text': 'Privacy settings',
  //     'Purpose Screen Body Text':
  //       'You can set your consent preferences and determine how you want your data to be used based on the purposes below. You may set your preferences for us independently from those of third-party partners. Each purpose has a description so that you know how we and partners use your data.',
  //     'Vendor Screen Body Text':
  //       'You can set consent preferences for each individual third-party company below. Expand each company list item to see what purposes they use data for to help make your choices. In some cases, companies may disclose that they use your data without asking for your consent, based on their legitimate interests. You can click on their privacy policies for more information and to opt out.',
  //     'Vendor Screen Accept All Button Text': 'Accept all',
  //     'Vendor Screen Reject All Button Text': 'Reject all',
  //     'Initial Screen Body Text':
  //       'We and our partners use technology such as cookies on our site to personalise content and ads, provide social media features, and analyse our traffic. Click below to consent to the use of this technology across the web. You can change your mind and change your consent choices at anytime by returning to this site.',
  //     'Initial Screen Body Text Option': 1,
  //     'Publisher Name': 'Frontity',
  //     'Publisher Purpose IDs': [3, 5, 4, 1, 2],
  //     'Min Days Between UI Displays': null,
  //     'No Option': false,
  //   },
  // };

  // window.cmpLang = {
  //   en: {
  //     footerTitle: 'Your privacy is important to us',
  //     footerLogoUrl: '',
  //     footerDescription:
  //       'We and our partners use cookies to personalize your content and create more valuable experiences for you. We may collect non-sensitive information about your usage. You can consent to the use of this technology or manage your settings to fully control what information is being collected and processed. For more information on our data policies, please visit our Privacy Statement.',
  //     footerManageBtnText: 'Manage my choices',
  //     footerAcceptAllBtnText: 'Accept',
  //     modalTitle: 'Your privacy is important to us',
  //     modalDescription:
  //       'We and our partners use cookies to personalize your content and create more valuable experiences for you. We may collect non-sensitive information about your usage. You can consent to the use of this technology or manage your settings to fully control what information is being collected and processed. For more information on our data policies, please visit our Privacy Statement.',
  //     modalPurposeTitle: 'You authorize',
  //     modalVendorTitle: 'For the following partners',
  //     modalSaveBtnText: 'Save',
  //     modalAcceptAllBtnText: 'Accept all',
  //     modalRejectAllBtnText: 'Reject all',
  //   },
  //   es: {
  //     footerTitle: 'Su privacidad es importante para nosotros',
  //     footerLogoUrl: '',
  //     footerDescription: `Utilizamos cookies para personalizar el contenido, características y anuncios.
  //       Compartimos información sobre el uso de nuestro sitio con nuestros socios, que pueden
  //       combinarla con otros datos aportados en sus servicios.
  //       Puede aceptar el uso de esta tecnología o administrar su configuración
  //       y así controlar completamente que información se recopila y gestiona. `,
  //     footerManageBtnText: 'Gestionar mis opciones',
  //     footerAcceptAllBtnText: 'Aceptar',
  //     modalTitle: 'Su privacidad es importante para nosotros',
  //     modalDescription: `Utilizamos cookies para personalizar el contenido, características y anuncios.
  //       Compartimos información sobre el uso de nuestro sitio con nuestros socios, que pueden
  //       combinarla con otros datos aportados en sus servicios. `,
  //     modalPurposeTitle: 'Usted autoriza',
  //     modalVendorTitle: 'Para los siguientes socios',
  //     modalSaveBtnText: 'Guardar',
  //     modalAcceptAllBtnText: 'Aceptar todos',
  //     modalRejectAllBtnText: 'Rechazar todos',
  //   },
  // };

  // const gdprStub = window.document.createElement('script');
  // gdprStub.src = '//cmp.smartadserver.mgr.consensu.org/stub.js';
  // gdprStub.async = 'async';
  // window.document.head.appendChild(gdprStub);

  // yield call(() => new Promise(resolve => gdprStub.addEventListener('load', resolve)));

  // const gdprCmp = window.document.createElement('script');
  // gdprCmp.src = '//cmp.smartadserver.mgr.consensu.org/cmp.js';
  // gdprCmp.async = 'async';
  // window.document.head.appendChild(gdprCmp);

  /**
   *
   */

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
        let body = document.body,
          iframe = document.createElement('iframe');
        iframe.style = 'display:none';
        iframe.name = '__cmpLocator';
        body.appendChild(iframe);
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
      json = event.data.indexOf('__cmpCall') != -1 ? JSON.parse(event.data) : {};
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
  window.__cmp = function(c) {
    const b = arguments;
    if (!b.length) {
      return __cmp.a;
    } else if (b[0] === 'ping') {
      b[2](
        {
          gdprAppliesGlobally,
          cmpLoaded: false,
        },
        true,
      );
    } else if (c == '__cmp') return false;
    else {
      if (typeof __cmp.a === 'undefined') {
        __cmp.a = [];
      }
      __cmp.a.push([].slice.apply(b));
    }
  };

  window.__cmp.gdprAppliesGlobally = gdprAppliesGlobally;
  window.__cmp.msgHandler = cmpMsgHandler;
  if (window.addEventListener) {
    window.addEventListener('message', cmpMsgHandler, false);
  } else {
    window.attachEvent('onmessage', cmpMsgHandler);
  }

  window.__cmp('init', {
    Language: 'es',
    'Initial Screen Reject Button Text': 'I do not accept',
    'Initial Screen Accept Button Text': 'I accept',
    'Purpose Screen Header Title Text': 'Privacy settings',
    'Purpose Screen Body Text':
      'You can set your consent preferences and determine how you want your data to be used based on the purposes below. You may set your preferences for us independently from those of third-party partners. Each purpose has a description so that you know how we and partners use your data.',
    'Vendor Screen Body Text':
      'You can set consent preferences for each individual third-party company below. Expand each company list item to see what purposes they use data for to help make your choices. In some cases, companies may disclose that they use your data without asking for your consent, based on their legitimate interests. You can click on their privacy policies for more information and to opt out.',
    'Vendor Screen Accept All Button Text': 'Accept all',
    'Vendor Screen Reject All Button Text': 'Reject all',
    'Initial Screen Body Text':
      'We and our partners use technology such as cookies on our site to personalise content and ads, provide social media features, and analyse our traffic. Click below to consent to the use of this technology across the web. You can change your mind and change your consent choices at anytime by returning to this site.',
    'Initial Screen Body Text Option': 1,
    'Publisher Name': 'Frontity',
    'Publisher Purpose IDs': [3, 5, 4, 1, 2],
    'Min Days Between UI Displays': null,
    'No Option': false,
  });
}
