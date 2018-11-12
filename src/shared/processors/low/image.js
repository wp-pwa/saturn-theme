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
          if (current && !final.includes(current)) final.push(current);
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

    // Get src value from different cases.
    let src =
      (typeof props['data-src'] === 'string' && props['data-src']) ||
      (typeof props.src === 'string' && props.src) ||
      (typeof props['data-original'] === 'string' && props['data-original']) ||
      null;

    // Complete src url if necessary.
    if (typeof src === 'string' && src.startsWith('/')) {
      src = `${settings.generalSite.url}${src}`;
    }

    // Get srcset value from different cases.
    let srcSet =
      (typeof props['data-srcset'] === 'string' && props['data-srcset']) ||
      (typeof props.srcSet === 'string' && props.srcSet) ||
      null;

    // Complete srcset urls if necessary.
    if (typeof srcSet === 'string') {
      srcSet = srcSet
        .split(',')
        .map(s => {
          const trimmed = s.trim();
          return `${
            trimmed.startsWith('/') ? settings.generalSite.url : ''
          }${trimmed}`;
        })
        .join(', ');
    }

    // Calculate height value.
    const height =
      (props.height &&
        props.width &&
        `${100 * (props.height / props.width)}vw`) ||
      'auto';

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
