import Color from 'color-js';
import styled from 'styled-components';
import { inject } from 'mobx-react';

const Blockquote = styled.blockquote`
  background: ${({ color, theme }) =>
    Color(color || theme.colors.evilGrey)
      .setAlpha(0.2)
      .toString()};
  border-left: 0.25rem solid
    ${({ color, theme }) => color || theme.colors.evilGrey};
`;

export default inject(({ stores: { settings: { theme } } }) => ({
  color: theme.blockquoteStyles && theme.blockquoteStyles.color,
}))(Blockquote);
