import React from 'react';
import styled from 'styled-components';
import ShareTotal from './ShareTotal';
import ShareClose from './ShareClose';

const ShareHeader = () =>
  <Container>
    <ShareTotal />
    <ShareClose />
  </Container>;

export default ShareHeader;

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
  height: ${({ theme }) => theme.titleSize};
  position: relative;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
