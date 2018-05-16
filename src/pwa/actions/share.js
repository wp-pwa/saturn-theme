import * as actionTypes from '../actionTypes';

export const openingRequested = ({ wpType, id, component }) => ({
  type: actionTypes.SHARE_MODAL_OPENING_REQUESTED,
  wpType,
  id,
  event: {
    category: component,
    action: 'open share modal',
  },
});
export const openingStarted = () => ({ type: actionTypes.SHARE_MODAL_OPENING_STARTED });
export const openingFinished = () => ({ type: actionTypes.SHARE_MODAL_OPENING_FINISHED });

export const closingRequested = () => ({
  type: actionTypes.SHARE_MODAL_CLOSING_REQUESTED,
});
export const closingStarted = () => ({ type: actionTypes.SHARE_MODAL_CLOSING_STARTED });
export const closingFinished = () => ({ type: actionTypes.SHARE_MODAL_CLOSING_FINISHED });

export const allShareCountRequested = ({ wpType, id }) => ({
  type: actionTypes.ALL_SHARE_COUNT_REQUESTED,
  wpType,
  id,
});
export const allShareCountResolved = ({ wpType, id }) => ({
  type: actionTypes.ALL_SHARE_COUNT_RESOLVED,
  wpType,
  id,
});

export const shareCountRequested = ({ wpType, id, network, link }) => ({
  type: actionTypes.SHARE_COUNT_REQUESTED,
  wpType,
  id,
  network,
  link,
});
export const shareCountSucceed = ({ wpType, id, network, value }) => ({
  type: actionTypes.SHARE_COUNT_SUCCEED,
  wpType,
  id,
  network,
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
      category: 'Share modal',
      action: 'share',
      label: 'method: copy',
    };
  }

  return action;
};

export const linkShared = ({ network, component }) => ({
  type: actionTypes.LINK_SHARED,
  event: {
    category: component,
    action: 'share',
    label: `method: ${network}`,
  },
});
