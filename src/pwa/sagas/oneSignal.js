/* eslint no-use-before-define: ["error", { "functions": false }] */
import { take, takeLatest, call, put } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import { notifications } from '../actions';
import * as types from '../types';

export function initOneSignalSaga() {
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

      OneSignal.setDefaultNotificationUrl('https://demo.worona.dev'); // from settings
      OneSignal.init({
        appId: '99b23543-2160-4748-8b51-509f4c626a1d', // from settings
        subdomainName: 'worona-dev', // from settings
        wordpress: true,
        autoRegister: false,
        // allowLocalhostAsSecureOrigin: true,
        httpPermissionRequest: { enable: true },
        notifyButton: { enable: false },
      })
        .then(OneSignal.isPushNotificationsEnabled)
        .then(isPushEnabled => resolve(isPushEnabled));

      OneSignal.on('subscriptionChange', isSubscribed => {
        // TODO - Look at "worona-pwa/core/sagas/client.js" and use the same pattern with channels.
        console.log("The user's subscription state is now:", isSubscribed);
      });
    });
  });
}

function* requestNotifications() {
  window.OneSignal.push(['registerForPushNotifications']);
  yield call(waitForEnabled);
}

function* waitForEnabled() {
  yield take(types.NOTIFICATIONS_HAVE_BEEN_ENABLED);
  window.OneSignal.push(['setSubscription', true]);
  yield call(waitForDisabled);
}

function* waitForDisabled() {
  yield take(types.NOTIFICATIONS_HAVE_BEEN_DISABLED);
  window.OneSignal.push(['setSubscription', false]);
}

export default function* oneSignalSagas() {
  yield take(dep('build', 'types', 'CLIENT_REACT_RENDERED'));

  yield takeLatest(types.NOTIFICATIONS_HAVE_BEEN_REQUESTED, requestNotifications);

  const isPushEnabled = yield call(initOneSignalSaga);
  if (isPushEnabled) yield call(waitForDisabled);
}
