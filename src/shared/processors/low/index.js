import image from './image';
import blockquote from './blockquote';
import removeArticles from './removeArticles';
import removeContentAds from './removeContentAds';
import gallery from './gallery';
import wpappbox from './wpappbox';
import anchor from './anchor';
import table from './table';
import removeWpEmbedsInAmp from './removeWpEmbedsInAmp';

export default [
  removeContentAds,
  removeArticles,
  removeWpEmbedsInAmp,
  anchor,
  image,
  blockquote,
  gallery,
  wpappbox,
  table,
];
