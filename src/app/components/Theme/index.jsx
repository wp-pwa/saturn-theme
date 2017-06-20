import React from 'react';

import '!!style!css!postcss!mini.css/dist/mini-default.css';

const Theme = ({ children }) => children;
Theme.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Theme;
