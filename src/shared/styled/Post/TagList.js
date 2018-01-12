import styled from 'react-emotion';

export const Container = styled.ul`
  display: flex;
  justify-content: flex-start;
  list-style: none;
  flex-wrap: wrap;
  align-items: center;
  padding: 25px 10px;
  border-bottom: 1px solid #eee;
`;

export const Item = styled.li`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 1px 1px 1px 0 ${({ theme }) => theme.colors.shadow};
  white-space: nowrap;
  font-size: 0.9rem;
  text-transform: uppercase;
  text-decoration: none;

  a,
  a:visited,
  a:hover,
  a:active {
    color: ${({ theme }) => theme.colors.text};
  }
`;
