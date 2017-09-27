import LazyVideo from '../../elements/LazyVideo';
import { filter } from '../../elements/HtmlToReactConverter/filter';

export default {
  test: ({ tagName }) => tagName === 'video',
  converter: ({ attributes, ...rest }) => {
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
      tagName: LazyVideo,
      attributes: {
        width,
        height,
        offset: 400,
        throttle: 50,
        imgProps: filter(attributes),
      },
      children: [{ ...rest, attributes: { ...attributes, 'data-lazy': true } }],
    };
  },
};
