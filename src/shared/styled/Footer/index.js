import styled from 'react-emotion';

export const Container = styled.div`
  width: 100%;
  height: ${({ theme, bar }) =>
    bar === 'single' ? `calc(140px + ${theme.heights.bar})` : '140px'};
  padding: 20px;
  padding-bottom: ${({ theme, bar }) =>
    bar === 'single' ? `calc(20px + ${theme.heights.bar})` : ''};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: #999;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.span`
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

export const Desktop = styled.a`
  font-size: 0.6rem;
  text-decoration: underline;
`;
