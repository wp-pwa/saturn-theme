import React from 'react';
import LazyFacebook from '../components/LazyFacebook';

const facebookHref = /(?:video|post)\.php\?href=(.+)?/;

export default {
  test: ({ component, props, ignore }) =>
    component === 'iframe' &&
    props.src.startsWith('https://www.facebook.com/') &&
    !ignore,
  process: element => {
    const { props } = element;
    const isVideo = props.src.includes('video.php');
    const href = decodeURIComponent(props.src.match(facebookHref)[1]);

    let proportion;

    if (props.width && props.height) {
      proportion = props.height / props.width;
    } else {
      proportion = 0.5;
    }

    const Facebook = () => (
      <LazyFacebook
        isVideo={isVideo}
        width="100vw"
        height={`calc(100vw * ${proportion})`}
        href={href}
        attributes={props}
      />
    );

    return { component: Facebook, props: {}, children: null };
  },
};
