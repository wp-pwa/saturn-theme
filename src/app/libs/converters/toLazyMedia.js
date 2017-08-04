import he from 'he';
import { filter } from '../../components/HtmlToReactConverter/filter';
import Media from '../../components/Media';

export default {
  test: element => element.tagName === 'img',
  converter: element => {
    const { attributes } = element;

    let height;
    let width;

    if (attributes.height && attributes.width) {
      width = '100vw';
      height = `${(attributes.height * 100) / attributes.width}vw`;
    } else {
      height = '120px';
      width = '120px';
    }

    if (attributes.src) attributes.src = he.decode(attributes.src);
    if (attributes.srcSet) attributes.srcSet = he.decode(attributes.srcSet);

    return {
      type: 'Element',
      tagName: Media,
      attributes: {
        lazy: true,
        width,
        height,
        offset: 300,
        throttle: 50,
        imgProps: filter(attributes),
      },
    };
  },
};
