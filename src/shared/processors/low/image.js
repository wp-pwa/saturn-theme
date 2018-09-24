/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from '../../../pwa/components/Link';
import Image from '../../components/Image';
import { media } from '../../contexts';

export default {
  test: element => {
    const { component, ignore } = element;
    // Returns false if it's already a lazy component.
    if (ignore) return false;

    // Returns true if element is an <img>.
    if (component === 'img') return true;

    // Filters comments out of children.
    return false;
  },
  process: (element, { stores: { settings }, item }) => {
    const { props } = element;
    const { 'data-attachment-id': attachmentId } = props;

    let ImageComponent;

    // Return an Image component with id if image has attachedId.
    if (attachmentId) {
      const id = parseInt(attachmentId, 10);
      const contentContext = [item.entity.media.featured.id]
        .concat(item.entity.media.content)
        .reduce((final, current) => {
          if (!final.includes(current)) final.push(current);
          return final;
        }, []);

      ImageComponent = () => (
        <Link
          type="media"
          id={id}
          context={media(contentContext || [])}
          eventCategory="Post"
          eventAction="open content media"
        >
          <a>
            <Image
              isContent
              key={attachmentId}
              id={id}
              lazyloadContainerSelector=".content"
            />
          </a>
        </Link>
      );
    } else {
      const alt = props.alt || null;

      let src = null;

      // Get src attribute from different cases.
      if (props.src && typeof props.src === 'string') {
        if (props.src.startsWith('/'))
          src = `${settings.generalSite.url}${props.src}`;
        else ({ src } = props);
      } else if (
        props['data-original'] &&
        typeof props['data-original'] === 'string'
      ) {
        if (props.src.startsWith('/'))
          src = `${settings.generalSite.url}${props['data-original']}`;
        else src = props['data-original'];
      }

      let srcSet = null;

      // Get srcset attribute from different cases.
      if (props.srcset && typeof props.srcset === 'string') {
        srcSet = props.srcset
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
      if (props.height && props.width) {
        height = `${100 * (props.height / props.width)}vw`;
      } else {
        height = 'auto';
      }

      ImageComponent = () => (
        <Image
          key={src}
          isContent
          width="100vw"
          height={height}
          alt={alt}
          src={src}
          srcSet={srcSet}
          lazyloadContainerSelector=".content"
        />
      );
    }

    return {
      type: 'Element',
      component: ImageComponent,
      props: {},
      children: [],
    };
  },
};
