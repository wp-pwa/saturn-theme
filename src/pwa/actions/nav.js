import * as actionTypes from '../actionTypes';

export const didMount = ({ maxScroll, scrollPositions }) => ({
  type: actionTypes.NAV_DID_MOUNT,
  maxScroll,
  scrollPositions
});
