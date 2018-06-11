/* eslint-disable import/prefer-default-export */
import styled from 'react-emotion';

export const ButtonContainer = styled.li`
  box-sizing: border-box;
  width: 100%;
  max-height: 61px;
  list-style: none;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;
