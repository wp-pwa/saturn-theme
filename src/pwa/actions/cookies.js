import * as actionTypes from '../actionTypes';

export const haveBeenRequested = () => ({
  type: actionTypes.COOKIES_HAVE_BEEN_REQUESTED,
});

export const haveBeenAccepted = () => ({
  type: actionTypes.COOKIES_HAVE_BEEN_ACCEPTED,
  event: {
    category: 'Cookies modal',
    action: 'close',
  },
});
