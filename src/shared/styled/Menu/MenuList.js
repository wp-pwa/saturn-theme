/* eslint-disable import/prefer-default-export */
import styled from 'react-emotion';

export const Container = styled.ul`
  box-sizing: border-box;
  width: 100%;
  height: ${({ theme }) => `calc(100% - ${theme.heights.bar})`};
  list-style: none;
  margin: 0;
  padding: 0;
  padding-bottom: ${({ isAmp, theme }) => (isAmp ? '' : theme.heights.bar)};
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  &:-webkit-scrollbar {
    display: none;
  }
`;
