import * as actionTypes from '../actionTypes';

export const hasBeenRequested = ({ event = null }) => ({
  type: actionTypes.NOTIFICATIONS_HAVE_BEEN_REQUESTED,
  event,
});
export const hasBeenEnabled = () => ({ type: actionTypes.NOTIFICATIONS_HAVE_BEEN_ENABLED });
export const hasBeenDisabled = ({ event = null }) => ({
  type: actionTypes.NOTIFICATIONS_HAVE_BEEN_DISABLED,
  event,
});
export const areSupported = () => ({ type: actionTypes.NOTIFICATIONS_ARE_SUPPORTED });
