/* global window */
import { takeEvery, select, take, fork, call } from 'redux-saga/effects';
import request from 'superagent';
import { dep } from 'worona-deps';

const types = {
  get CLIENT_REACT_RENDERED() {
    return dep('build', 'types', 'CLIENT_REACT_RENDERED');
  },
  get ROUTE_CHANGE_SUCCEED() {
    return dep('router', 'types', 'ROUTE_CHANGE_SUCCEED');
  },
  get APP_SETTINGS_SUCCEED() {
    return dep('settings', 'types', 'APP_SETTINGS_SUCCEED');
  },
  get POST_SUCCEED() {
    return dep('connection', 'types', 'POST_SUCCEED');
  },
  get PAGE_SUCCEED() {
    return dep('connection', 'types', 'PAGE_SUCCEED');
  },
  get NEW_POSTS_LIST_SUCCEED() {
    return dep('connection', 'types', 'NEW_POSTS_LIST_SUCCEED');
  }
};

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

const currentListSucceed = () => action =>
  action.type === types.NEW_POSTS_LIST_SUCCEED && action.name === 'currentList';

const sendPageView = (siteName, siteUrl, wpType, entity) => {
  let prefix = '';

  if (['post', 'page', 'search'].includes(wpType)) {
    prefix = `${entity.title.rendered} - `;
  } else if (['category', 'tag', 'author', 'media'].includes(wpType)) {
    prefix = `${entity.name} - `;
  }

  const pageview = {
    hitType: 'pageview',
    title: `${prefix}${siteName}`,
    page: (entity ? new window.URL(entity.link) : new window.URL(siteUrl)).pathname
  };

  console.log('PAGEVIEW', pageview);
  window.ga('clientTracker.send', pageview);
};

function* getTypeAndId() {
  const type = yield select(dep('router', 'selectors', 'getType'));
  const id = yield select(dep('router', 'selectors', 'getId'));
  return { type, id };
}

export function* virtualPageView(siteName, siteUrl) {
  const { type, id } = yield call(getTypeAndId);

  if (type === 'latest') {
    yield take(wpTypeSucceed(types.PAGE_SUCCEED, id));
    yield call(sendPageView, siteName, siteUrl, type);
    return;
  }

  const entity = yield select(
    dep('connection', 'selectorCreators', 'getWpTypeById')(wpTypeToPlural[type], id)
  );

  if (['post', 'media'].includes(type)) {
    yield take(wpTypeSucceed(types.POST_SUCCEED, id));
    yield call(sendPageView, siteName, siteUrl, type, entity);
    return;
  }
  if (['category', 'tag', 'author', 'search'].includes(type)) {
    yield take(currentListSucceed());
    yield call(sendPageView, siteName, siteUrl, type, entity);
    return;
  }
  if (type === 'page') {
    yield take(wpTypeSucceed(types.PAGE_SUCCEED, id));
    yield call(sendPageView, siteName, siteUrl, type, entity);
    return;
  }
}

export default function* googleAnalyticsSagas() {
  console.log('ENTER GOOGLE ANALYTICS SAGA');
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

  yield takeEvery(types.ROUTE_CHANGE_SUCCEED, virtualPageView, siteName, siteUrl);
}
