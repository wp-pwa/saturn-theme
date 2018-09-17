/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.li`
  box-sizing: border-box;
  height: ${({ theme }) => theme.heights.bar};
  width: 100%;
  border-left: ${({ isSelected }) =>
    isSelected ? '3px solid #333' : '3px solid transparent'};
  text-transform: uppercase;
  letter-spacing: 1px;

  a {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: ${({ isSelected }) => (isSelected ? '#333' : '#999')};
    font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
    padding-left: 20px;
    padding-right: 10px;
    height: 100%;
    width: 100%;
    font-size: 0.9rem;
    text-decoration: none;
  }
`;
