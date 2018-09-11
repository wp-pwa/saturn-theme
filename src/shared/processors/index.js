import anchor from './anchor';
import blockquote from './blockquote';
import tzGallery from './tzGallery';
import dmGallery from './dmGallery';
import myrGallery from './myrGallery';
import myrTiledGallery from './myrTiledGallery';
import removeInlineStyle from './removeInlineStyle';
import removeAmpIds from './removeAmpIds';
import removeAmpListTypes from './removeAmpListTypes';
import removeAmpColWidth from './removeAmpColWidth';
import injectSlots from './injectSlots';

export default [
  injectSlots,
  removeInlineStyle,
  removeAmpIds,
  removeAmpListTypes,
  removeAmpColWidth,
  anchor,
  blockquote,
  tzGallery,
  dmGallery,
  myrGallery,
  myrTiledGallery,
];
