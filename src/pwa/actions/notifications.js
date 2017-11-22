import * as actionTypes from '../actionTypes';

export const hasBeenRequested = () => ({ type: actionTypes.NOTIFICATIONS_HAVE_BEEN_REQUESTED });
export const hasBeenEnabled = () => ({ type: actionTypes.NOTIFICATIONS_HAVE_BEEN_ENABLED });
export const hasBeenDisabled = () => ({ type: actionTypes.NOTIFICATIONS_HAVE_BEEN_DISABLED });
export const areSupported = () => ({ type: actionTypes.NOTIFICATIONS_ARE_SUPPORTED });
