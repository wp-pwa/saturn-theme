import * as actionTypes from '../actionTypes';

export const hasShown = ({ timeout }) => ({
  type: actionTypes.STICKY_HAS_SHOWN,
  timeout,
});

export const hasHidden = ({ closedByUser }) => ({
  type: actionTypes.STICKY_HAS_HIDDEN,
  closedByUser,
});
