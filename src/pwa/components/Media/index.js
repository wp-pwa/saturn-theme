import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import SlotInjector from '../../../shared/components/SlotInjector';
import Image from '../../../shared/components/Image';

const Media = ({ id, width, height }) => (
  <Container>
    <SlotInjector position="before image" item={{ type: 'media', id }} />
    <Image id={id} width="100vw" height={`${(height * 100) / width}vw`} />
    <SlotInjector position="after image" item={{ type: 'media', id }} />
  </Container>
);

Media.propTypes = {
  id: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default inject(({ stores: { connection } }, { id }) => ({
  width: connection.entity('media', id).original.width,
  height: connection.entity('media', id).original.height,
}))(Media);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
  background: #0e0e0e;
  width: 100vw;
  min-height: ${({ theme }) => `calc(100vh - ${theme.heights.bar})`};
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding-bottom: ${({ theme }) => theme.heights.bar};
`;
