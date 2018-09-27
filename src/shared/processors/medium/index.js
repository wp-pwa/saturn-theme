import anchor from './anchor';
import tzGallery from './tzGallery';
import dmGallery from './dmGallery';
import myrGallery from './myrGallery';
import myrTiledGallery from './myrTiledGallery';
import { textCounter, restartCounter, injectSlot } from './injectSlots';

export default [
  restartCounter,
  injectSlot,
  textCounter,
  anchor,
  tzGallery,
  dmGallery,
  myrGallery,
  myrTiledGallery,
];
