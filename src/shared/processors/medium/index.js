import anchor from './anchor';
import tzGallery from './tzGallery';
import dmGallery from './dmGallery';
import myrGallery from './myrGallery';
import myrTiledGallery from './myrTiledGallery';
import removeInlineStyle from './removeInlineStyle';
import removeAmpIds from './removeAmpIds';
import removeAmpListTypes from './removeAmpListTypes';
import removeAmpColWidth from './removeAmpColWidth';
import { textCounter, restartCounter, injectSlot } from './injectSlots';

export default [
  restartCounter,
  textCounter,
  injectSlot,
  removeInlineStyle,
  removeAmpIds,
  removeAmpListTypes,
  removeAmpColWidth,
  anchor,
  tzGallery,
  dmGallery,
  myrGallery,
  myrTiledGallery,
];
