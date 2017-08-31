import * as types from '../types';

export const didMount = ({ maxScroll, scrollPositions }) => ({
  type: types.NAV_DID_MOUNT,
  maxScroll,
  scrollPositions
});
