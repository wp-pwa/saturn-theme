/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.heights.bar};
  width: ${({ theme }) => theme.heights.bar};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  color: inherit;
`;
