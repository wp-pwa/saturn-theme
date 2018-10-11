/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from '../../../pwa/components/Link';
import Image from '../../components/Image';
import { media } from '../../contexts';

export default {
  test: ({ component, ignore }) => !ignore && component === 'img',
  process: (element, { stores: { settings }, item }) => {
    const { props } = element;
    const { 'data-attachment-id': attachmentId } = props;

    // Return an Image component with id if image has attachedId.
    if (attachmentId) {
      const id = parseInt(attachmentId, 10);
      const contentContext = [item.entity.media.featured.id]
        .concat(item.entity.media.content)
        .reduce((final, current) => {
          if (!final.includes(current)) final.push(current);
          return final;
        }, []);

      return {
        type: 'element',
        component: Link,
        props: {
          id,
          type: 'media',
          context: media(contentContext || []),
          eventCategory: 'Post',
          eventAction: 'open content media',
        },
        children: [
          {
            type: 'element',
            component: 'a',
            props: {},
            children: [
              {
                type: 'element',
                component: Image,
                props: { id, key: attachmentId, isContent: true },
                children: null,
              },
            ],
          },
        ],
      };
    }

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
      if (props['data-original'].startsWith('/'))
        src = `${settings.generalSite.url}${props['data-original']}`;
      else src = props['data-original'];
    }

    let srcSet = null;

    // Get srcset attribute from different cases.
    if (props.srcSet && typeof props.srcSet === 'string') {
      srcSet = props.srcSet
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

    return {
      type: 'element',
      component: Image,
      props: {
        isContent: true,
        key: src,
        width: '100vw',
        height,
        alt,
        src,
        srcSet,
      },
      children: null,
    };
  },
};
