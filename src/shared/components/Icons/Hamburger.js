import React from 'react';
import PropTypes from 'prop-types';

const Hamburger = ({ size }) => (
  <svg
    height={size}
    width={size}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

Hamburger.propTypes = {
  size: PropTypes.number.isRequired,
};

export default Hamburger;
