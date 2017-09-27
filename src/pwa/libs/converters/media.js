import he from 'he';
import Media from '../../components/Media';

export default {
  test: ({ tagName, attributes, children }) =>
    ((tagName === 'p' &&
      children.length === 1 &&
      (children[0].tagName === 'img' ||
        (children[0].tagName === 'a' &&
          children[0].children.length === 1 &&
          children[0].children[0].tagName === 'img'))) ||
      tagName === 'img') &&
    !attributes['data-lazy'],
  converter: ({ tagName, children, ...rest }) => {
    let attributes;

    if (tagName === 'img') {
      attributes = rest.attributes;
    } else if (children[0].tagName === 'img') {
      attributes = children[0].attributes;
    } else {
      attributes = children[0].children[0].attributes;
    }

    const { alt, srcset } = attributes;

    let src;

    if (attributes.src && typeof attributes.src === 'string') {
      src = attributes.src;
    } else if (
      attributes.dataset &&
      attributes.dataset.original &&
      typeof attributes.dataset.original === 'string'
    ) {
      src = attributes.dataset.original;
    } else {
      src = '';
    }

    let height;
    let width;

    if (attributes.height && attributes.width) {
      width = '100vw';
      height = `${(attributes.height * 100) / attributes.width}vw`; // prettier-ignore
    } else {
      height = '120px';
      width = '100vw';
    }

    return {
      type: 'Element',
      tagName: Media,
      attributes: {
        // These are the props for Media
        lazy: true,
        content: true,
        width,
        height,
        alt,
        src: he.decode(src),
        srcSet: he.decode(srcset || ''),
      },
    };
  },
};
