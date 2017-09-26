/* global window */
import { takeEvery, select, fork } from 'redux-saga/effects';
import { dep } from 'worona-deps';

function* virtualPageView() {
  const title = yield select(dep('connection', 'selectors', 'getTitle'));
  const canonical = yield select(dep('connection', 'selectors', 'getCanonical'));

  let page;
  try {
    page = new window.URL(canonical).pathname;
  } catch (error) {
    page = '/';
  }

  window.ga('clientTracker.send', { hitType: 'pageview', title, page });
}

export default function* googleAnalyticsSagas() {
  if (!window.ga) {
    /* eslint-disable */
    (function(i, s, o, g, r, a, m) {
      i.GoogleAnalyticsObject = r;
      (i[r] =
        i[r] ||
        function() {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    /* eslint-enable */
  }

  const getSetting = dep('settings', 'selectorCreators', 'getSetting');

  // Client Tracking ID
  const trackingId = yield select(getSetting('theme', 'trackingId'));

  if (trackingId !== undefined) {
    window.ga('create', trackingId, 'auto', 'clientTracker');
    yield fork(virtualPageView);
    yield takeEvery(dep('router', 'types', 'ROUTE_CHANGE_SUCCEED'), virtualPageView);
  }
}
