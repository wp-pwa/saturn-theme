import React from 'react';
import he from 'he';
import Media from '../components/Media';

export default {
  test: element => {
    const { tagName, attributes } = element;
    /* Cases tested here:
      1:
        <img />
      2:
        <p>
          <img />
        </p>
      3:
        <p>
          <a>
            <img />
          </a>
        </p>
      4:
        <p>
          <a>
            <img />
          </a>
          "Text"
        </p>
      5:
        <h4>
          <a>
            <img />
          </a>
          "Text"
        </h4>
    */

    // Returns false if it's already a lazy component.
    if (attributes && attributes['data-lazy']) return false;

    // Returns true if element is an <img>.
    // Returns false if elements is not a <p>.
    if (tagName === 'img') return true;
    else if (tagName !== 'p' && tagName !== 'h4') return false;

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

    return false;
  },
  converter: (element, extraProps) => {
    const { tagName, ...rest } = element;
    const children = element.children.filter(child => child.type && child.type !== 'Comment');

    let attributes;

    // Get attributes from <img> element.
    if (tagName === 'img') {
      ({ attributes } = rest);
    } else if (children[0].tagName === 'img') {
      [{ attributes }] = children;
    } else {
      [{ attributes }] = children[0].children;
    }

    const { alt, srcset } = attributes;

    let src;

    // Get src attribute from different cases or assign an empty string.
    if (attributes.src && typeof attributes.src === 'string') {
      ({ src } = attributes);
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

    // Calculate width and height.
    if (attributes.height && attributes.width) {
      width = '100vw';
      height = `${(attributes.height * 100) / attributes.width}vw`; // prettier-ignore
    } else {
      height = 'auto';
      width = '100vw';
    }

    // Media element with lazy load.
    const { slide } = extraProps;
    const media = (
      <Media
        lazy
        content
        offsetVertical={400}
        offsetHorizontal={-50}
        width={width}
        height={height}
        alt={alt}
        src={he.decode(src)}
        srcSet={srcset ? he.decode(srcset) : null}
        slide={slide || null}
      />
    );

    const sibling = children && children[1];

    // If Media has siblings, wraps them in a <div>.
    if (sibling) return <div>{[media, <p>{sibling}</p>]}</div>;

    return media;
  },
};
