import React from 'react';
import NativeGallery from '../components/NativeGallery';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'div' &&
    attributes &&
    ((attributes.id && attributes.id.includes('gallery')) ||
      (attributes.className && attributes.className.some(clazz => clazz.includes('gallery')))),
  converter: element => {
    const getImgAttributes = ({ children = [], tagName, attributes }) => {
      if (tagName === 'img') {
        const { alt, sizes, src, srcset } = attributes;
        return [{ alt, sizes, src, srcset }];
      }
      return children.reduce((all, child) => all.concat(getImgAttributes(child)), []);
    };

    return <NativeGallery imgAttributes={getImgAttributes(element)} />;
  },
};
