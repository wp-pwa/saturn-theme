/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Link from '../../../pwa/components/Link';
import Image from '../Image';
import { media as mediaContext } from '../../contexts';

const FeaturedImage = ({ media, featuredImageHeight, contentContext }) =>
  media ? (
    <Link
      type="media"
      id={media}
      context={mediaContext(contentContext || [])}
      eventCategory="Post"
      eventAction="open featured media"
    >
      <a>
        <Image id={media} height={featuredImageHeight} width="100%" />
      </a>
    </Link>
  ) : null;

FeaturedImage.propTypes = {
  media: PropTypes.number,
  featuredImageHeight: PropTypes.string,
  contentContext: PropTypes.arrayOf(PropTypes.number).isRequired,
};

FeaturedImage.defaultProps = {
  media: null,
  featuredImageHeight: '250px',
};

export default inject(({ stores: { connection, settings } }, { type, id }) => {
  const featuredImage = settings.theme.featuredImage || {};
  const medias = connection.entity(type, id).media;

  return {
    media: medias.featured.id,
    featuredImageHeight: featuredImage.height,
    contentContext: [medias.featured.id]
      .concat(medias.content)
      .reduce((final, current) => {
        if (!final.includes(current)) final.push(current);
        return final;
      }, []),
  };
})(FeaturedImage);
