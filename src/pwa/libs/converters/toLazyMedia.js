import he from 'he';
import Media from '../../components/Media';

export default {
  test: element => element.tagName === 'img',
  converter: element => {
    const { attributes } = element;
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
        width,
        height,
        alt,
        src: he.decode(src),
        srcSet: he.decode(srcset || ''),
      },
    };
  },
};
