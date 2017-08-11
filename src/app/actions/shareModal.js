import * as types from '../types';

export const openingRequested = ({ id, wpType }) => ({
  type: types.SHARE_MODAL_OPENING_REQUESTED,
  id,
  wpType,
});
export const openingStarted = () => ({ type: types.SHARE_MODAL_OPENING_STARTED });
export const openingFinished = () => ({ type: types.SHARE_MODAL_OPENING_FINISHED });

export const closingRequested = () => ({ type: types.SHARE_MODAL_CLOSING_REQUESTED });
export const closingStarted = () => ({ type: types.SHARE_MODAL_CLOSING_STARTED });
export const closingFinished = () => ({ type: types.SHARE_MODAL_CLOSING_FINISHED });

export const allShareCountRequested = ({ entity }) => ({
  type: types.ALL_SHARE_COUNT_REQUESTED,
  entity,
});
export const allShareCountSucceed = ({ id }) => ({
  type: types.ALL_SHARE_COUNT_SUCCEED,
  id,
});
export const allShareCountFailed = ({ id }) => ({
  type: types.ALL_SHARE_COUNT_FAILED,
  id,
});

export const shareCountRequested = ({ network, entity }) => ({
  type: types.SHARE_COUNT_REQUESTED,
  network,
  entity,
});
export const shareCountSucceed = ({ id, network, value }) => ({
  type: types.SHARE_COUNT_SUCCEED,
  id,
  network,
  value,
});
export const shareCountFailed = ({ id, network }) => ({
  type: types.SHARE_COUNT_FAILED,
  id,
  network,
});

export const setLinkCopied = ({ value }) => ({ type: types.LINK_COPIED, value });
