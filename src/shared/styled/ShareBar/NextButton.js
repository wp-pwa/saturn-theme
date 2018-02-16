import styled from 'react-emotion';
import IconNext from 'react-icons/lib/fa/angle-right';

export const Container = styled.a`
  box-sizing: border-box;
  height: ${({ theme }) => theme.heights.bar};
  margin: 0;
  padding: 0 10px;
  width: 130px;
  background-color: ${({ theme }) => theme.colors.background};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  text-decoration: none;
  flex-shrink: 0;

  &,
  &:visited {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Text = styled.span`
  text-transform: uppercase;
  padding-top: 1px;
  text-overflow: ellipsis;
`;

export const StyledIconNext = styled(IconNext)`
  height: 1em;
  width: 1em;
  padding-bottom: 1px;
  padding-left: 0px;
`;
