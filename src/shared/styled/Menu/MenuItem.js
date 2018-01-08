/* eslint-disable import/prefer-default-export */
import styled from 'react-emotion';

export const Container = styled.li`
  box-sizing: border-box;
  height: ${({ theme }) => theme.heights.bar};
  width: 100%;
  border-left: ${({ isActive }) => (isActive ? '3px solid #333' : '3px solid transparent')};

  a {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: ${({ isActive }) => (isActive ? '#333' : '#999')};
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    padding-left: 20px;
    padding-right: 10px;
    height: 100%;
    width: 100%;
    font-size: 0.9rem;
    text-decoration: none;
  }
`;
