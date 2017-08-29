import * as types from '../types';

export const navScrollStarted = ({ interval }) => ({ type: types.NAV_SCROLL_STARTED, interval });
export const navScrollFinished = () => ({ type: types.NAV_SCROLL_FINISHED });
