import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const ImageIcon = ({ size }) => (
  <Svg
    size={size}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-image"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </Svg>
);

ImageIcon.propTypes = {
  size: PropTypes.number.isRequired,
};

export default ImageIcon;

const Svg = styled.svg`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;
