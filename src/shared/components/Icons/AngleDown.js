import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AngleDown = ({ size }) => (
  <Svg
    height={size}
    width={size}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
  >
    <path d="M151.5 347.8L3.5 201c-4.7-4.7-4.7-12.3 0-17l19.8-19.8c4.7-4.7 12.3-4.7 17 0L160 282.7l119.7-118.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17l-148 146.8c-4.7 4.7-12.3 4.7-17 0z" />
  </Svg>
);

AngleDown.propTypes = {
  size: PropTypes.number.isRequired,
};

export default AngleDown;

const Svg = styled.svg`
  display: flex;
  justify-content: center;
  align-items: center;
`;
