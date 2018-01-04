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
    `transform: translateY(${
      status.startsWith('enter') ? 0 : 100
    }%); transition: transform 500ms ease ${status.startsWith('exit') ? 0 : 500}ms;`};
  box-shadow: 0 0 3px 0 #999;
  z-index: 300;
`;

export const Header = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
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
`;

export const Text = styled.p`
  padding: 0 20px;
  margin: 10px 0;
  font-size: 0.8rem;
`;

export const Button = styled.button`
  margin: 10px;
  padding: 15px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  font-size: 0.9rem;
  border: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
`;
