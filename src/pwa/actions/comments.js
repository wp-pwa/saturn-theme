import * as actionTypes from '../actionTypes';

export const haveOpen = () => ({
  type: actionTypes.COMMENTS_HAVE_OPEN,
  event: {
    category: 'Comments',
    action: 'open',
  },
});

export const haveClosed = () => ({
  type: actionTypes.COMMENTS_HAVE_CLOSED,
});
