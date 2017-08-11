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

export const allShareCountRequested = ({ id, wpType }) => ({
  type: types.ALL_SHARE_COUNT_REQUESTED,
  id,
  wpType,
});
export const allShareCountResolved = ({ id }) => ({
  type: types.ALL_SHARE_COUNT_RESOLVED,
  id,
});

export const shareCountRequested = ({ network, id, link }) => ({
  type: types.SHARE_COUNT_REQUESTED,
  network,
  id,
  link,
});
export const shareCountSucceed = ({ network, id, value }) => ({
  type: types.SHARE_COUNT_SUCCEED,
  network,
  id,
  value,
});
export const shareCountFailed = ({ network, id }) => ({
  type: types.SHARE_COUNT_FAILED,
  network,
  id,
});

export const setLinkCopied = ({ value }) => ({ type: types.LINK_COPIED, value });
