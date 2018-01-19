/* eslint-disable import/prefer-default-export */
import styled from 'react-emotion';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  height: ${({ theme }) => theme.heights.bar};
  width: 100%;
  display: flex;
  color: ${({ theme, dark }) => dark ? 'white' : theme.colors.text};
  background-color: ${({ theme, dark }) => dark ? '#0e0e0e' : theme.colors.background};
  ${({ isAmp, theme, isHidden }) =>
    isAmp
      ? ''
      : `
    transform: translateY(-${isHidden ? theme.heights.bar : 0});
    transition: transform 0.3s ease;
  `};
  z-index: 70;
`;
