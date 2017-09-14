/* eslint: no-underscore-dangle: ["error", { "allow": ["_oneSignalInitOptions"] }] */
import { take } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import { NOTIFICATIONS_HAS_BEEN_ENABLED, NOTIFICATIONS_HAS_BEEN_DISABLED } from '../types';

export default function* oneSignalSagas() {
  yield take(dep('build', 'types', 'CLIENT_SAGAS_INITIALIZED'));

  // Load OneSignal SDK
  const oneSignalSDK = window.document.createElement('script');
  oneSignalSDK.src = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
  oneSignalSDK.async = 'async';
  window.document.head.appendChild(oneSignalSDK);

  // Init OneSignal
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
      httpPermissionRequest: { enable: true },
      notifyButton: { enable: false },
    });
  });

  yield take(NOTIFICATIONS_HAS_BEEN_ENABLED);
  window.OneSignal.isPushNotificationsEnabled().then(isPushEnabled => {
    if (isPushEnabled) window.OneSignal.push(['setSubscription', true]);
    else window.OneSignal.push(['registerForPushNotifications']);
  });

  yield take(NOTIFICATIONS_HAS_BEEN_DISABLED);
  window.OneSignal.push(['setSubscription', false]);
}
