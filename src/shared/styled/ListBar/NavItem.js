/* eslint-disable import/prefer-default-export */
import styled from 'react-emotion';

export const Container = styled.li`
  box-sizing: border-box;
  flex-shrink: 0;
  height: 100%;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  border-bottom: ${({ isSelected, theme }) =>
    isSelected ? `2px solid ${theme.colors.text}` : '2px solid rgba(153, 153, 153, 0)'};

  a {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 400;
    font-size: 0.9rem;
    padding: 0 17px;
    text-decoration: none;
    text-transform: uppercase;
    height: 100%;
    display: flex;
    align-items: center;
  }

  h1 {
    font-size: inherit;
    margin: inherit;
    line-height: inherit;
    font-weight: inherit;
  }
`;
