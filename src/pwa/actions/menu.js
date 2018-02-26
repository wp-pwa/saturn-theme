import * as actionTypes from '../actionTypes';

export const hasOpen = ({ component }) => ({
  type: actionTypes.MENU_HAS_OPEN,
  event: {
    category: component,
    action: 'open menu',
  },
});

export const hasClosed = () => ({
  type: actionTypes.MENU_HAS_CLOSED,
});
