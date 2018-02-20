import * as actionTypes from '../actionTypes';

export const hasOpen = () => ({
  type: actionTypes.MENU_HAS_OPEN,
  event: {
    category: 'Menu',
    action: 'open',
  },
});

export const hasClosed = () => ({
  type: actionTypes.MENU_HAS_CLOSED,
  event: {
    category: 'Menu',
    action: 'close',
  },
});
