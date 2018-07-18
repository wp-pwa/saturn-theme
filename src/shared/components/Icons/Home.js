import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ size }) => (
  <svg
    height={size}
    width={size}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

Home.propTypes = {
  size: PropTypes.number.isRequired,
};

export default Home;
