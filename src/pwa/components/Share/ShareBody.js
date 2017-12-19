import React from 'react';
import styled from 'react-emotion';
import SharePreview from './SharePreview';
import ShareList from './ShareList';

const ShareBody = () => (
  <Container>
    <SharePreview />
    <ShareList />
  </Container>
);

export default ShareBody;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-height: 320px;

  @media ${({ theme }) => theme.tablet} {
    display: flex;
  }
`;
