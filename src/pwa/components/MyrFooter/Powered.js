/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import styled from 'react-emotion';

const Powered = () => (
  <Container>
    <Text href="https://worona.org" rel="noopener nofollow" target="_blank">
      Mobile version powered by Worona
    </Text>
  </Container>
);

export default Powered;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 15px 20px;
  padding-top: 0;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Text = styled.a`
  font-size: 0.8rem;
  font-weight: 600;
  width: 40vw;
  text-align: center;
  color: ${({ theme }) => theme.colors.link};
`;
