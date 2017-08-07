import { MENU_HAS_OPEN, MENU_HAS_CLOSED } from '../types';

export const hasOpen = () => ({ type: MENU_HAS_OPEN });
export const hasClosed = () => ({ type: MENU_HAS_CLOSED });
