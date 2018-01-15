import React from 'react';
import styled from 'react-emotion';

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

    return <DummyGallery>{mediaIds.map(id => <DummyImage>{id}</DummyImage>)}</DummyGallery>;
  },
};

const DummyGallery = styled.div`
  width: 100%;
  background: yellow;
`;

const DummyImage = styled.div`
  text-align: center;
  width: 100%;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  font-weight: bold;
`;
