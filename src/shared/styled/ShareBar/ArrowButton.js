import styled from 'react-emotion';
import IconBack from 'react-icons/lib/md/arrow-back';
import IconNext from 'react-icons/lib/md/arrow-forward';

export const Container = styled.a`
  box-sizing: border-box;
  height: 56px;
  margin: 0;
  padding: 0;
  width: 60px;
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

export const StyledIconBack = styled(IconBack)`
  height: 2em;
  width: 2em;
  padding-bottom: 1px;
  padding-left: 0px;
`;

export const StyledIconNext = styled(IconNext)`
  height: 2em;
  width: 2em;
  padding-bottom: 1px;
  padding-left: 0px;
`;
