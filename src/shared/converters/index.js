import image from './image';
import audio from './audio';
import video from './video';
import youtube from './youtube';
import twitter from './twitter';
import instagram from './instagram';
import facebook from './facebook';
import blockquote from './blockquote';
import iframe from './iframe';
import removeArticles from './removeArticles';
import removeContentAds from './removeContentAds';
import gallery from './gallery';
import wpappbox from './wpappbox';
import removeHidden from './removeHidden';
import removeTagStyle from './removeTagStyle';
import anchor from './anchor';
import table from './table';
import soundcloud from './soundcloud';
import removeWpEmbeddedContent from './removeWpEmbeddedContent';
import removeDoctypeHeadTags from './removeDoctypeHeadTags';
import removeHtmlBodyTags from './removeHtmlBodyTags';

export default [
  removeDoctypeHeadTags,
  removeHtmlBodyTags,
  removeContentAds,
  removeArticles,
  removeHidden,
  removeTagStyle,
  removeWpEmbeddedContent,
  anchor,
  image,
  audio,
  video,
  youtube,
  twitter,
  instagram,
  facebook,
  blockquote,
  soundcloud,
  iframe,
  gallery,
  wpappbox,
  table,
];
