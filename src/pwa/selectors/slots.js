/* eslint-disable import/prefer-default-export */
import { dep } from 'worona-deps';

export const getAllSlots = state =>
  dep('settings', 'selectorCreators', 'getSetting')('theme', 'slots')(state);
