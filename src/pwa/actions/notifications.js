import { NOTIFICATIONS_HAS_BEEN_ENABLED, NOTIFICATIONS_HAS_BEEN_DISABLED } from '../types';

export const hasBeenEnabled = () => ({ type: NOTIFICATIONS_HAS_BEEN_ENABLED });
export const hasBeenDisabled = () => ({ type: NOTIFICATIONS_HAS_BEEN_DISABLED });
