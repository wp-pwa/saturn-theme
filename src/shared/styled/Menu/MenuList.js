/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.ul`
  box-sizing: border-box;
  width: 100%;
  height: ${({ theme }) => `calc(100% - ${theme.heights.menuHeader})`};
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  &:-webkit-scrollbar {
    display: none;
  }
`;
