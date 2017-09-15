import * as types from '../types';

export const hasBeenRequested = () => ({ type: types.NOTIFICATIONS_HAVE_BEEN_REQUESTED });
export const hasBeenEnabled = () => ({ type: types.NOTIFICATIONS_HAVE_BEEN_ENABLED });
export const hasBeenDisabled = () => ({ type: types.NOTIFICATIONS_HAVE_BEEN_DISABLED });
