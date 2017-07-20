/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint-env browser */
import React, { PropTypes } from 'react';
import { lifecycle } from 'recompose';

const AmpComponent = ({ ampTag, ampScript, ...props }) => {
  const AmpTag = ampTag;
  return <AmpTag {...props} />;
};

AmpComponent.propTypes = {
  ampTag: PropTypes.string.isRequired,
  ampScript: PropTypes.string,
  props: PropTypes.shape({}),
};

const setupAmp = () => {
  if (!document.querySelector('html[amp]')) {
    document.querySelector('html').setAttribute('amp', '');

    const fragment = document.createDocumentFragment();

    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', '_blank');
    fragment.appendChild(link);

    const ampLib = document.createElement('script');
    ampLib.setAttribute('async', '');
    ampLib.setAttribute('src', 'https://cdn.ampproject.org/v0.js');
    fragment.appendChild(ampLib);

    const boilerplate = document.createElement('style');
    boilerplate.setAttribute('amp-boilerplate', '');
    boilerplate.innerText =
      '<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>';
    fragment.appendChild(boilerplate);

    document.head.appendChild(fragment);
  }
};

export default lifecycle({
  componentDidMount() {
    setupAmp();
    if (this.props.ampScript && !document.querySelector(`script[src="${this.props.ampScript}"]`)) {
      const ampScript = document.createElement('script');
      ampScript.setAttribute('async', '');
      ampScript.setAttribute('src', this.props.ampScript);
      document.head.appendChild(ampScript);
    }
  },
})(AmpComponent);
