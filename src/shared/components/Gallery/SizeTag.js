import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import ImageIcon from './ImageIcon';

const SizeTag = ({ length }) => (
  <Container>
    <ImageIcon size={16} />
    {length}
  </Container>
);

SizeTag.propTypes = {
  length: PropTypes.number.isRequired,
};

export default SizeTag;

const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  left: 8px;
  bottom: 8px;
  padding: 8px;
  padding-left: 7px;
  height: 34px;
  border-radius: 4px;
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.white};
  background-color: #312f3c;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;

  svg {
    margin-right: 7px;
  }
`;
