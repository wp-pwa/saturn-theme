import styled from 'react-emotion';

export const Container = styled.ul`
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  align-items: center;
  padding: 25px 10px;
  border-bottom: 1px solid #eee;
  margin: 0;
  ${({ rtl }) => (rtl ? 'direction: rtl' : null)};
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
  text-decoration: none;
  font-size: ${({ rtl }) => (rtl ? '1.2rem' : '0.9rem')};
  ${({ rtl }) => (rtl ? null : 'text-transform: uppercase')};

  a,
  a:visited,
  a:hover,
  a:active {
    color: ${({ theme }) => theme.colors.text};
  }
`;
