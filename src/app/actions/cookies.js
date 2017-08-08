import { COOKIES_HAVE_BEEN_REQUESTED, COOKIES_HAVE_BEEN_ACCEPTED } from '../types';

export const haveBeenRequested = () => ({
  type: COOKIES_HAVE_BEEN_REQUESTED,
});

export const haveBeenAccepted = () => ({
  type: COOKIES_HAVE_BEEN_ACCEPTED,
});
