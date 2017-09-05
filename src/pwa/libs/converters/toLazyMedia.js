import he from 'he';
import Media from '../../components/Media';

export default {
  test: element => element.tagName === 'img',
  converter: element => {
    const { attributes } = element;
    const { dataset, alt, srcset } = attributes;

    let height;
    let width;

    if (attributes.height && attributes.width) {
      width = '100vw';
      height = `${(attributes.height * 100) / attributes.width}vw`; // prettier-ignore
    } else {
      height = '120px';
      width = '120px';
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
        src: he.decode(dataset.original),
        srcSet: he.decode(srcset)
      }
    };
  }
};
