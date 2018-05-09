import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import SlotInjector from '../../../shared/components/SlotInjector';
import Image from '../../../shared/components/Image';
import Spinner from '../../elements/Spinner';

const Media = ({ id, ready, width, height, item }) =>
  ready ? (
    <Container>
      <SlotInjector item={item}>
        <Image id={id} width="100vw" height={`${height * 100 / width}vw`} />
      </SlotInjector>
    </Container>
  ) : (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );

Media.propTypes = {
  id: PropTypes.number.isRequired,
  ready: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  item: PropTypes.shape({}).isRequired,
};

export default inject(({ connection }, { id }) => ({
  ready: connection.entity('media', id).ready,
  width: connection.entity('media', id).original.width,
  height: connection.entity('media', id).original.height,
  item: connection.selectedContext.getItem({ item: { type: 'media', id } }),
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

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100vh;
`;
