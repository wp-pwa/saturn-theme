import React from 'react';
import LazyFacebook from '../components/LazyFacebook';

const facebookHref = /(?:video|post)\.php\?href=(.+)?/;

export default {
  test: ({ component, attributes, ignore }) =>
    component === 'iframe' &&
    attributes.src.startsWith('https://www.facebook.com/') &&
    !ignore,
  process: element => {
    const { attributes } = element;

    const isVideo = attributes.src.includes('video.php');

    const href = decodeURIComponent(attributes.src.match(facebookHref)[1]);

    let proportion;

    if (attributes.width && attributes.height) {
      proportion = attributes.height / attributes.width;
    } else {
      proportion = 0.5;
    }

    return (
      <LazyFacebook
        isVideo={isVideo}
        width="100vw"
        height={`calc(100vw * ${proportion})`}
        href={href}
        attributes={attributes}
      />
    );
  },
};
