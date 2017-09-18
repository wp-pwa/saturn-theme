/* eslint no-use-before-define: ["error", { "functions": false }] */
import { take, takeEvery, takeLatest, select, call, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { dep } from 'worona-deps';
import { notifications } from '../actions';
import * as types from '../types';

const subscriptionChanged = () =>
  eventChannel(emitter => {
    const emitSubscription = isSubscribed => emitter({ isSubscribed });
    window.OneSignal.on('subscriptionChange', emitSubscription);
    return () => window.OneSignal.removeListener('subscriptionChange', emitSubscription);
  });

const initOneSignal = ({ defaultNotificationUrl, appId, subdomainName }) => {
  // Load OneSignal SDK
  const oneSignalSDK = window.document.createElement('script');
  oneSignalSDK.src = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
  oneSignalSDK.async = 'async';
  window.document.head.appendChild(oneSignalSDK);

  // Returns if push notifications were enabled previously, after OneSignal initialization.
  return new Promise(resolve => {
    window.OneSignal = window.OneSignal || [];
    window.OneSignal.push(() => {
      const OneSignal = window.OneSignal;
      OneSignal.SERVICE_WORKER_UPDATER_PATH = 'OneSignalSDKUpdaterWorker.js.php';
      OneSignal.SERVICE_WORKER_PATH = 'OneSignalSDKWorker.js.php';
      OneSignal.SERVICE_WORKER_PARAM = { scope: '/' };

      OneSignal.setDefaultNotificationUrl(defaultNotificationUrl); // from settings
      OneSignal.init({
        appId, // from settings
        subdomainName, // from settings
        wordpress: true,
        autoRegister: false,
        allowLocalhostAsSecureOrigin: true,
        httpPermissionRequest: { enable: true },
        notifyButton: { enable: false },
      })
        .then(OneSignal.isPushNotificationsEnabled)
        .then(isPushEnabled => resolve(isPushEnabled));
    });
  });
};

function* requestNotifications() {
  window.OneSignal.push(['registerForPushNotifications']);
  yield call(waitForEnabled);
}

function* waitForEnabled() {
  yield take(types.NOTIFICATIONS_HAVE_BEEN_ENABLED);
  yield call(waitForDisabled);
}

function* waitForDisabled() {
  yield take(types.NOTIFICATIONS_HAVE_BEEN_DISABLED);
  window.OneSignal.push(['setSubscription', false]);
}

function* putWhenEnabled({ isSubscribed }) {
  if (isSubscribed) {
    yield put(notifications.hasBeenEnabled());
  }
}

export default function* oneSignalSagas() {
  yield take(dep('build', 'types', 'CLIENT_REACT_RENDERED'));

  const oneSignalSettings = yield select(
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'oneSignal'),
  );

  if (oneSignalSettings) {
    const isPushEnabled = yield call(initOneSignal, oneSignalSettings);

    yield takeLatest(types.NOTIFICATIONS_HAVE_BEEN_REQUESTED, requestNotifications);
    yield takeEvery(subscriptionChanged(), putWhenEnabled);

    if (isPushEnabled) yield call(waitForDisabled);
    else yield put(notifications.hasBeenDisabled());
  }
}
