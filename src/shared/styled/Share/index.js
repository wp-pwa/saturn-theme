import styled from 'react-emotion';

export const ShareHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  height: ${({ theme }) => theme.heights.bar};
  position: relative;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ShareBody = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-height: 320px;
  display: block;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

export const ButtonContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-height: 61px;
  list-style: none;
  padding: 10px;
  text-align: left;
  display: flex;
  justify-content: space-between;
`;

export const ShareBadge = styled.button`
  outline: none;
  flex: 0 0 auto;
  border-radius: 3px;
  box-sizing: content-box;
  color: #ffffff;
  background-color: ${({ theme, network }) => theme.colors[network] || theme.colors.copy};
  position: relative;
  padding: 0 10px;
  margin: 7px 0;
  height: 26px;
  min-width: 80px;
  text-align: center;
  font-size: 0.75em;
  line-height: 26px;
  text-transform: uppercase;
  border: none;

  &:focus {
    background-color: ${({ theme, network }) => theme.colors[network] || theme.colors.copy};
  }
`;
