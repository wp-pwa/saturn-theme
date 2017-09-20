import { take, takeEvery, takeLatest, select, call, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { dep } from 'worona-deps';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as types from '../types';

const subscriptionChanged = () =>
  eventChannel(emitter => {
    const emitSubscription = isSubscribed => emitter({ isSubscribed });
    window.OneSignal.on('subscriptionChange', emitSubscription);
    return () => window.OneSignal.removeListener('subscriptionChange', emitSubscription);
  });

const loadOneSignal = () => {
  // Load OneSignal SDK
  const oneSignalSDK = window.document.createElement('script');
  oneSignalSDK.src = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
  oneSignalSDK.async = 'async';
  window.document.head.appendChild(oneSignalSDK);

  // Returns if push notifications are supported.
  return new Promise(resolve => {
    window.OneSignal = window.OneSignal || [];
    window.OneSignal.push(() => {
      const supported = window.OneSignal.isPushNotificationsSupported();
      resolve({ supported });
    });
  });
}

const initOneSignal = ({ defaultNotificationUrl, appId, subdomainName, path }) => {

  const OneSignal = window.OneSignal;
  OneSignal.SERVICE_WORKER_UPDATER_PATH = 'OneSignalSDKUpdaterWorker.js.php';
  OneSignal.SERVICE_WORKER_PATH = 'OneSignalSDKWorker.js.php';
  OneSignal.SERVICE_WORKER_PARAM = { scope: '/' };

  OneSignal.setDefaultNotificationUrl(defaultNotificationUrl); // from settings

  return OneSignal.init({
    appId, // from settings
    subdomainName, // from settings
    path: path || '/wp-content/plugins/onesignal-free-web-push-notifications/sdk_files/',
    wordpress: true,
    autoRegister: false,
    allowLocalhostAsSecureOrigin: true,
    httpPermissionRequest: { enable: true },
    notifyButton: { enable: false },
  });
};

function* waitForDisabled() {
  yield take(types.NOTIFICATIONS_HAVE_BEEN_DISABLED);
  window.OneSignal.push(['setSubscription', false]);
}

function* requestNotifications() {
  const registered = yield select(selectors.notifications.registered);
  if (registered) {
    window.OneSignal.push(['setSubscription', true]);
  } else {
    window.OneSignal.push(['registerForPushNotifications']);
  }
  yield call(waitForDisabled);
}

function* putWhenEnabled({ isSubscribed }) {
  if (isSubscribed) {
    yield put(actions.notifications.hasBeenEnabled());
  }
}

export default function* oneSignalSagas() {
  yield take(dep('build', 'types', 'CLIENT_REACT_RENDERED'));

  const getSetting = dep('settings', 'selectorCreators', 'getSetting');
  const oneSignalSettings = yield select(getSetting('theme', 'oneSignal'));

  // Exits if OneSignal is not configured for this client.
  if (!oneSignalSettings) return;

  const { supported } = yield call(loadOneSignal);

  // Exits if OneSignal is not supported for current browser.
  if (!supported) return;

  yield put(actions.notifications.areSupported());
  yield call(initOneSignal, oneSignalSettings);

  yield takeLatest(types.NOTIFICATIONS_HAVE_BEEN_REQUESTED, requestNotifications);
  yield takeEvery(subscriptionChanged(), putWhenEnabled);

  const enabled = yield call(window.OneSignal.isPushNotificationsEnabled);
  if (enabled) {
    yield call(waitForDisabled);
  } else {
    yield put(actions.notifications.hasBeenDisabled());
  }
}
