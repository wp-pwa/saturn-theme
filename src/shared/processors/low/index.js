import image from './image';
import blockquote from './blockquote';
import removeArticles from './removeArticles';
import removeContentAds from './removeContentAds';
import gallery from './gallery';
import wpappbox from './wpappbox';
import anchor from './anchor';
import table from './table';
import removeWpEmbeddedContent from './removeWpEmbeddedContent';

export default [
  removeContentAds,
  removeArticles,
  removeWpEmbeddedContent,
  anchor,
  image,
  blockquote,
  gallery,
  wpappbox,
  table,
];
