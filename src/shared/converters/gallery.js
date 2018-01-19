import React from 'react';
import Gallery from '../components/Gallery';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'div' && attributes && attributes.dataset && attributes.dataset.carouselExtra,
  converter: element => {
    const getAttachementIds = ({ children = [], attributes }) => {
      const attachmentId =
        attributes && attributes.dataset && parseInt(attributes.dataset.attachmentId, 10);
      return attachmentId
        ? [attachmentId]
        : children.reduce((all, child) => all.concat(getAttachementIds(child)), []);
    };

    return <Gallery mediaIds={getAttachementIds(element)} />;
  }
};
