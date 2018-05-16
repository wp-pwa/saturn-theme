import * as actionTypes from '../actionTypes';

export const hasBeenRequested = payload => ({
  type: actionTypes.NOTIFICATIONS_HAVE_BEEN_REQUESTED,
  event: payload && payload.event ? payload.event : null,
});
export const hasBeenEnabled = () => ({ type: actionTypes.NOTIFICATIONS_HAVE_BEEN_ENABLED });
export const hasBeenDisabled = payload => ({
  type: actionTypes.NOTIFICATIONS_HAVE_BEEN_DISABLED,
  event: payload && payload.event ? payload.event : null,
});
export const areSupported = () => ({ type: actionTypes.NOTIFICATIONS_ARE_SUPPORTED });
