import React from 'react';
import styled from 'react-emotion';
import ShareTotal from './ShareTotal';
import ShareClose from './ShareClose';

const ShareHeader = () => (
  <Container>
    <ShareTotal />
    <ShareClose />
  </Container>
);

export default ShareHeader;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  height: ${({ theme }) => theme.heights.bar};
  position: relative;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
