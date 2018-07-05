/* eslint-disable import/prefer-default-export */
import styled from 'react-emotion';

export const Container = styled.div`
  height: 100px};
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;
