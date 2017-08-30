/* global window */
import { takeEvery, select, take, fork, call } from 'redux-saga/effects';
import request from 'superagent';
import { dep } from 'worona-deps';

const wpTypeToPlural = {
  post: 'posts',
  page: 'pages',
  search: 'searchs',
  category: 'categories',
  tag: 'tags',
  author: 'users',
  media: 'media'
};

const wpTypeSucceed = (actionType, id) => action => action.type === actionType && action.id === id;

const currentListSucceed = action =>
  action.type === dep('connection', 'types', 'NEW_POSTS_LIST_SUCCEED') &&
  action.name === 'currentList';

const getTitlePrefix = (wpType, entity) => {
  if (entity) {
    if (['post', 'page', 'search'].includes(wpType)) {
      return `${entity.title.rendered} - `;
    }
    if (['category', 'tag', 'author', 'media'].includes(wpType)) {
      return `${entity.name} - `;
    }
  }
  return '';
};

function* sendPageView(siteName, siteUrl, wpType, id) {
  const entity = yield select(
    dep('connection', 'selectorCreators', 'getWpTypeById')(wpTypeToPlural[wpType], id)
  );

  const props = {
    title: `${getTitlePrefix(wpType, entity)}${siteName}`,
    page: (new window.URL(entity ? entity.link : siteUrl)).pathname,
  };

  console.log('PAGEVIEW', props);
  window.ga('clientTracker.send', { hitType: 'pageview', ...props });
}

function* getTypeAndId() {
  const type = yield select(dep('router', 'selectors', 'getType'));
  const id = yield select(dep('router', 'selectors', 'getId'));
  return { type, id };
}

export function* virtualPageView(siteName, siteUrl) {
  const { type, id } = yield call(getTypeAndId);

  if (['post', 'media'].includes(type)) {
    yield take(wpTypeSucceed(dep('connection', 'types', 'POST_SUCCEED'), id));
    yield call(sendPageView, siteName, siteUrl, type, id);
    return;
  }
  if (['latest', 'category', 'tag', 'author', 'search'].includes(type)) {
    yield take(currentListSucceed);
    yield call(sendPageView, siteName, siteUrl, type, id);
    return;
  }
  if (type === 'page') {
    yield take(wpTypeSucceed(dep('connection', 'types', 'PAGE_SUCCEED'), id));
    yield call(sendPageView, siteName, siteUrl, type, id);
    return;
  }
}

export default function* googleAnalyticsSagas() {
  console.log('GOOGLE ANALYTICS SAGA');
  if (!window.ga) {
    /* eslint-disable */
    (function(i, s, o, g, r, a, m) {
      i.GoogleAnalyticsObject = r;
      (i[r] =
        i[r] ||
        function() {
          (i[r].q = i[r].q || []).push(arguments);
        }), (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    /* eslint-enable */
  }

  const siteUrl = yield select(
    dep('settings', 'selectorCreators', 'getSetting')('generalSite', 'url')
  );
  const shouldUseCors = siteUrl.startsWith('http://') && window.location.protocol === 'https:';
  const prefix = shouldUseCors ? 'https://cors.worona.io/' : '';
  const siteName = (yield call(request, `${prefix}${siteUrl}/?rest_route=/`)).body.name;
  const trackingId = 'UA-91312941-3';
  window.ga('create', trackingId, 'auto', 'clientTracker');

  yield fork(function* firstVirtualPageView() {
    const { type, id } = yield call(getTypeAndId);
    yield call(sendPageView, siteName, siteUrl, type, id);
  });

  yield takeEvery(
    dep('router', 'types', 'ROUTE_CHANGE_SUCCEED'),
    virtualPageView,
    siteName,
    siteUrl
  );
}
