/* eslint-disable import/prefer-default-export */
import styled from 'react-emotion';

export const Container = styled.ul`
  height: ${({ theme }) => theme.heights.navbar};
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  list-style: none;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
