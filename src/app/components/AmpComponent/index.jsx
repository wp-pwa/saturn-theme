/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint-env browser */
import React, { PropTypes } from 'react';

const AmpComponent = ({ className, ampTag, ampScript, ...props }) =>
  React.createElement(ampTag, { class: className, ...props });

AmpComponent.propTypes = {
  className: PropTypes.string,
  ampTag: PropTypes.string.isRequired,
  ampScript: PropTypes.string,
  props: PropTypes.shape({}),
};

export default AmpComponent;
