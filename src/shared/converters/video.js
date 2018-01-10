import LazyVideo from '../components/LazyVideo';
import { filter } from '../components/HtmlToReactConverter/filter';

export default {
  test: ({ tagName, attributes }) => {
    /* Cases tested:
      1:
        <video />
      2:
        <div class='wp-video'>
          <video />
        </div>
    */

    // Returns false if it's already a lazy component.
    if (attributes && attributes['data-lazy']) return false;

    // Returns true if it's a <video>.
    if (tagName === 'video') return true;

    // Returns true if it's a <div> with class 'wp-video'.
    if (
      tagName === 'div' &&
      attributes &&
      attributes.className &&
      attributes.className.includes('wp-video')
    ) {
      return true;
    }

    return false;
  },
  converter: element => {
    const { tagName } = element;

    let height;
    let width;
    let attributes;
    let children;

    if (tagName === 'video') {
      ({ attributes } = element);
      ({ children } = element);
    } else if (tagName === 'div') {
      const child = element.children.find(c => c.tagName === 'video');
      ({ attributes } = child);
      children = child.children.filter(c => c.tagName === 'source');
    }

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
        videoProps: filter(attributes) || {}
      },
      children: children.map(child => {
        child.attributes['data-lazy'] = true;
        return child;
      })
    };
  }
};
