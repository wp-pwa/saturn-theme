import React from 'react';
import Header from '../Header';
import Share from '../Share';

import '!!style!css!postcss!mini.css/dist/mini-default.css'; // eslint-disable-line

const Theme = ({ children }) =>
  <div>
    <Header />
    {children}
    <Share />
  </div>;

Theme.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Theme;
