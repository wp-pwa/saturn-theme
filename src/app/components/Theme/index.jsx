import React from 'react';
import Header from '../Header';

import '!!style!css!postcss!mini.css/dist/mini-default.css'; // eslint-disable-line

const Theme = ({ children }) =>
  <div>
    <Header />
    {children}
  </div>;

Theme.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Theme;
