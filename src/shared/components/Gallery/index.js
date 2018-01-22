import React from 'react';
import PropTypes from 'prop-types';
import ItemList from './ItemList';
import GalleryWithLinks from './GalleryWithLinks';

const Gallery = ({ useIds, mediaAttributes }) =>
  useIds ? (
    <GalleryWithLinks mediaIds={mediaAttributes.map(({ attachmentId }) => attachmentId)} />
  ) : (
    <ItemList mediaAttributes={mediaAttributes} />
  );

Gallery.propTypes = {
  useIds: PropTypes.bool.isRequired,
  mediaAttributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Gallery;
