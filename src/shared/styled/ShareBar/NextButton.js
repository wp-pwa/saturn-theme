import styled from 'styled-components';

export const Container = styled.a`
  box-sizing: border-box;
  height: ${({ theme }) => theme.heights.bar};
  margin: 0;
  padding: 0 10px;
  width: 130px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  text-decoration: none;
  flex-shrink: 0;
  flex-grow: 1;

  &,
  &:visited {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const Text = styled.span`
  text-transform: uppercase;
  padding-top: 1px;
  text-overflow: ellipsis;
`;
