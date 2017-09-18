import { dep } from 'worona-deps';

export const enabled = state => !!state.theme.notifications.enabled;
export const ready = state =>
  !!dep('settings', 'selectorCreators', 'getSetting')('theme', 'oneSignal')(state);
