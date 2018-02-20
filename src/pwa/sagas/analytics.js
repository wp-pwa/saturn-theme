import { takeEvery, select, call } from 'redux-saga/effects';
import { when } from 'mobx';
import { dep } from 'worona-deps';

let disposer;

function virtualPageView({ connection }) {
  const { single } = connection.context.selected;
  if (disposer) {
    disposer();
    disposer = null;
  }

  if (!single) {
    const { title } = connection.siteInfo.home;
    window.ga('clientTracker.send', { hitType: 'pageview', title, page: '/' });
  } else {
    disposer = when(
      () => single && single.meta.pretty && single.link.pretty,
      () => {
        const { title } = single.meta;
        const page = single.link.url;
        const pageView = { hitType: 'pageview', title, page };
        window.ga('clientTracker.send', pageView);
      },
    );
  }
}

export const succeedHandlerCreator = stores =>
  function* succeedHandler() {
    yield call(virtualPageView, stores);
  };

export default function* googleAnalyticsSagas(stores) {
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
    // Sends first pageView
    virtualPageView(stores);

    yield takeEvery(
      dep('connection', 'actionTypes', 'ROUTE_CHANGE_SUCCEED'),
      succeedHandlerCreator(stores),
    );
  }
}
