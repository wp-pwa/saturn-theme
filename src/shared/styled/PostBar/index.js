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
  color: ${({ theme, isFlat }) => (isFlat ? theme.colors.text : theme.colors.white)};
  ${({ theme, isFlat }) =>
    isFlat
      ? `background: ${theme.colors.background};`
      : `
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.8) 0%,
          rgba(0, 0, 0, 0.4) 60%,
          rgba(0, 0, 0, 0) 100%
        );
    `};
  ${({ isAmp, theme, isHidden }) =>
    isAmp
      ? ''
      : `
    transform: translateY(-${isHidden ? theme.heights.bar : 0});
    transition: transform 0.3s ease;
  `};
  z-index: 70;
`;
