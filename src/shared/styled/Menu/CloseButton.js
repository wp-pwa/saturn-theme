/* eslint-disable import/prefer-default-export */
import styled from 'react-emotion';

export const Container = styled.div`
  width: ${({ theme }) => theme.heights.bar};
  height: ${({ theme }) => theme.heights.bar};
  display: flex;
  justify-content: center;
  align-items: center;
`;
