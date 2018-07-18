/* eslint-disable import/prefer-default-export */
import styled from 'react-emotion';

export const Container = styled.div`
  height: ${({ theme }) => theme.heights.menuHeader};
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;
