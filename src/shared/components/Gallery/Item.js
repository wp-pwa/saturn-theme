import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { noop } from 'lodash';
import Image from '../Image';
import SizeTag from './SizeTag';

const Item = ({ alt, sizes, src, srcset, onClick, first, length }) => (
  <Container onClick={onClick}>
    <Image
      lazy
      offsetHorizonal={30}
      alt={alt}
      sizes={sizes}
      src={src}
      srcset={srcset}
      width="100%"
      height="100%"
    />
    {first && <SizeTag length={length} />}
  </Container>
);

Item.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  sizes: PropTypes.string,
  srcset: PropTypes.string,
  onClick: PropTypes.func,
  first: PropTypes.bool.isRequired,
  length: PropTypes.number.isRequired,
};

Item.defaultProps = {
  alt: '',
  sizes: null,
  srcset: null,
  onClick: noop,
};

export default Item;

const Container = styled.li`
  box-sizing: border-box;
  width: 290px;
  height: 250px;
  margin-right: 8px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  &:last-child {
    margin-right: 0;
  }
`;
