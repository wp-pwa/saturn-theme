import styled from 'react-emotion';

export const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  background-color: #fff;
  color: #333;
  position: fixed;
  left: 0;
  bottom: 0;
  ${({ status }) =>
    status &&
    `
      transform: translateY(${status.startsWith('enter') ? 0 : 100}%);
      transition: transform 500ms ease ${status.startsWith('exit') ? 0 : 500}ms;
    `};
  box-shadow: ${({ theme }) => theme.shadows.bottom};
  z-index: 2147483647;
`;

export const Header = styled.div`
  background-color: ${({ theme }) =>
    theme.colors.background !== '#ffffff' ? theme.colors.background : '#666'};
  color: ${({ theme }) => (theme.colors.background !== '#ffffff' ? theme.colors.text : '#FFF')};
  width: 100%;
  height: ${({ theme }) => theme.heights.bar};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 1.2rem;
  padding: 15px;
  margin: 0;
`;

export const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;

  & > button {
    box-sizing: border-box;
    width: 100vw;
    background-color: transparent;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    padding: 10px 0;

    span {
      padding: 15px;
      font-size: 0.9rem;
      background-color: ${({ theme }) =>
        theme.colors.background !== '#ffffff' ? theme.colors.background : '#666'};
      color: ${({ theme }) => (theme.colors.background !== '#ffffff' ? theme.colors.text : '#FFF')};
    }
  }
`;

export const Text = styled.p`
  padding: 0 20px;
  margin: 10px 0;
  font-size: 0.8rem;
  text-align: center;
`;

export const Url = styled.a`
  color: ${({ theme, linkStyles }) =>
    linkStyles && linkStyles.color ? linkStyles.color : theme.colors.link};
  ${({ linkStyles }) => {
    if (linkStyles && !linkStyles.underline) {
      return null;
    }

    return 'text-decoration: underline';
  }};
  ${({ linkStyles }) => {
    if (linkStyles && linkStyles.bold) return 'font-weight: bold';

    return null;
  }};
`;
