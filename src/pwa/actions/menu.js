import * as actionTypes from '../actionTypes';

export const hasOpen = () => ({
  type: actionTypes.MENU_HAS_OPEN,
  event: {
    category: 'Side Menu',
    action: 'open',
  },
});

export const hasClosed = () => ({
  type: actionTypes.MENU_HAS_CLOSED,
});
