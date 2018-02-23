import * as actionTypes from '../actionTypes';

export const haveOpen = () => ({
  type: actionTypes.COMMENTS_HAVE_OPEN,
  event: {
    category: 'Post',
    action: 'open comments',
  },
});

export const haveClosed = () => ({
  type: actionTypes.COMMENTS_HAVE_CLOSED,
});
