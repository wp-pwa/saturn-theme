import * as actionTypes from '../actionTypes';

export const openingRequested = ({ id, wpType }) => ({
  type: actionTypes.SHARE_MODAL_OPENING_REQUESTED,
  id,
  wpType,
  event: {
    category: `Share modal`,
    action: 'open',
  },
});
export const openingStarted = () => ({ type: actionTypes.SHARE_MODAL_OPENING_STARTED });
export const openingFinished = () => ({ type: actionTypes.SHARE_MODAL_OPENING_FINISHED });

export const closingRequested = () => ({
  type: actionTypes.SHARE_MODAL_CLOSING_REQUESTED,
  event: {
    category: 'Share modal',
    action: 'close',
  },
});
export const closingStarted = () => ({ type: actionTypes.SHARE_MODAL_CLOSING_STARTED });
export const closingFinished = () => ({ type: actionTypes.SHARE_MODAL_CLOSING_FINISHED });

export const allShareCountRequested = ({ id, wpType }) => ({
  type: actionTypes.ALL_SHARE_COUNT_REQUESTED,
  id,
  wpType,
});
export const allShareCountResolved = ({ id }) => ({
  type: actionTypes.ALL_SHARE_COUNT_RESOLVED,
  id,
});

export const shareCountRequested = ({ network, id, link }) => ({
  type: actionTypes.SHARE_COUNT_REQUESTED,
  network,
  id,
  link,
});
export const shareCountSucceed = ({ network, id, value }) => ({
  type: actionTypes.SHARE_COUNT_SUCCEED,
  network,
  id,
  value,
});
export const shareCountFailed = ({ network, id }) => ({
  type: actionTypes.SHARE_COUNT_FAILED,
  network,
  id,
});

export const setLinkCopied = ({ value }) => {
  const action = {
    type: actionTypes.LINK_COPIED,
    value,
  };

  if (value) {
    action.event = {
      category: `Copy link button in ShareModal`,
      action: 'share',
    };
  }

  return action;
};

export const linkShared = ({ network, component }) => ({
  type: actionTypes.LINK_SHARED,
  event: {
    category: `${network} button in ${component}`,
    action: 'share',
  },
});
