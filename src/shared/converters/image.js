/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from '../../pwa/components/Link';
import Image from '../components/Image';
import { media } from '../contexts';

export default {
  test: element => {
    const { tagName, ignore } = element;
    // Returns false if it's already a lazy component.
    if (ignore) return false;

    // Returns true if element is an <img>.
    if (tagName === 'img') return true;

    // Filters comments out of children.
    return false;
  },
  process: (element, { stores: { settings }, extraProps: { item } }) => {
    const { attributes } = element;
    const { 'data-attachment-id': attachmentId } = attributes;

    // Return an Image component with id if image has attachedId.
    if (attachmentId) {
      const id = parseInt(attachmentId, 10);
      const contentContext = [item.entity.media.featured.id]
        .concat(item.entity.media.content)
        .reduce((final, current) => {
          if (!final.includes(current)) final.push(current);
          return final;
        }, []);

      return (
        <Link
          type="media"
          id={id}
          context={media(contentContext || [])}
          eventCategory="Post"
          eventAction="open content media"
        >
          <a>
            <Image isContent key={attachmentId} id={id} />
          </a>
        </Link>
      );
    }

    const alt = attributes.alt || null;

    let src = null;

    // Get src attribute from different cases.
    if (attributes.src && typeof attributes.src === 'string') {
      if (attributes.src.startsWith('/'))
        src = `${settings.generalSite.url}${attributes.src}`;
      else ({ src } = attributes);
    } else if (
      attributes['data-original'] &&
      typeof attributes['data-original'] === 'string'
    ) {
      if (attributes.src.startsWith('/'))
        src = `${settings.generalSite.url}${attributes['data-original']}`;
      else src = attributes['data-original'];
    }

    let srcSet = null;

    // Get srcset attribute from different cases.
    if (attributes.srcset && typeof attributes.srcset === 'string') {
      srcSet = attributes.srcset
        .split(',')
        .map(s => {
          const trimmed = s.trim();

          if (trimmed.startsWith('/'))
            return `${settings.generalSite.url}${trimmed}`;

          return trimmed;
        })
        .join(', ');
    }

    let height;

    // Calculate width and height.
    if (attributes.height && attributes.width) {
      height = `${100 * (attributes.height / attributes.width)}vw`;
    } else {
      height = 'auto';
    }

    return (
      <Image
        key={src}
        isContent
        width="100vw"
        height={height}
        alt={alt}
        src={src}
        srcSet={srcSet}
      />
    );
  },
};
