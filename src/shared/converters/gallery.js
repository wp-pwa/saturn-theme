import React from 'react';
import Gallery from '../components/Gallery';

const getImages = element =>
  element.tagName === 'img' && element.attributes.src
    ? [element]
    : (element.children || []).reduce(
        (all, child) => all.concat(getImages(child)),
        [],
      );

const getMediaAttributes = images =>
  images.map(({ attributes }) => {
    const { alt, sizes, src, srcset } = attributes;
    const { 'data-attachment-id': attachmentId } = attributes;

    const id = parseInt(attachmentId, 10) || null;
    return { id, alt, sizes, src, srcset };
  });

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'div' &&
    attributes &&
    attributes.id &&
    /(^|\s)gallery-\d+/.test(attributes.id),
  process: element => {
    const images = getImages(element);
    const mediaAttributes = getMediaAttributes(images);
    return <Gallery mediaAttributes={mediaAttributes} />;
  },
};
