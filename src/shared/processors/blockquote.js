import Color from 'color-js';
import { css } from 'react-emotion';

export default {
  test: ({ component }) => component === 'blockquote',
  process: (element, { stores, theme }) => {
    const { blockquoteStyles } = (stores && stores.settings.theme) || {};

    const color =
      blockquoteStyles && blockquoteStyles.color
        ? blockquoteStyles.color
        : theme.colors.evilGrey;
    const backgroundColor = Color(color)
      .setAlpha(0.2)
      .toString();

    const blockquoteClass = css`
      background: ${backgroundColor};
      border-left: 0.25rem solid ${color};
    `;

    const { className } = element.props;
    element.props.className = className
      ? `${className} ${blockquoteClass}`
      : blockquoteClass;

    return element;
  },
};
