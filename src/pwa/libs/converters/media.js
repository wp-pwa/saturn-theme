import he from 'he';
import Media from '../../components/Media';

export default {
  test: element => {
    const { tagName, attributes } = element;

    // Returns false if it's already a lazy component.
    // if (attributes && attributes['data-lazy']) return false;

    // Returns true if element is an <img>.
    // Returns false if elements is not a <p>.
    if (tagName === 'img') return true;
    else if (tagName !== 'p') return false;

    // Filters comments out of children.
    const children = element.children.filter(child => child.type && child.type !== 'Comment');

    // Returns false if children length is different than 1 or 2.
    if (children.length < 1 || children.length > 2) return false;

    if (children.length === 1) {
      // Returns true if first child is an <img>.
      // Returns false if first child is not an <a>.
      if (children[0].tagName === 'img') return true;
      else if (children[0].tagName !== 'a') return false;

      // Returns true if next child is an <img>, false otherwise.
      return children[0].children.length === 1 && children[0].children[0].tagName === 'img';
    }

    if (children.length === 2) {
      // Returns false if first child is not an <a> or second child is not text.
      if (children[0].tagName !== 'a' || children[1].type !== 'Text') return false;

      // Returns true if next child is an <img>, false otherwise.
      return children[0].children.length === 1 && children[0].children[0].tagName === 'img';
    }
  },
  converter: element => {
    console.log(element);
    return element;

    const { tagName, children, ...rest } = element;

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
