/* eslint-disable import/prefer-default-export */
import { dep } from 'worona-deps';

export const getSlots = state =>
  dep('settings', 'selectorCreators', 'getSetting')('theme', 'slots')(state) || [];
