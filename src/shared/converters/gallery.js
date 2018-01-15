import React from 'react';
import Gallery from '../components/Gallery';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'div' && attributes && attributes.dataset && attributes.dataset.carouselExtra,
  converter: element => {
    const mediaIds = element.children.reduce((ids, child) => {
      if (child.attributes.className.includes('gallery-row')) {
        ids = ids.concat(
          child.children.map(
            gChild => gChild.children[0].children[0].children[0].attributes.dataset.attachmentId,
          ),
        );
      } else {
        ids.push(child.children[0].children[0].children[0].attributes.dataset.attachmentId);
      }
      return ids;
    }, []);
    return <Gallery ids={mediaIds} />;
  },
};
