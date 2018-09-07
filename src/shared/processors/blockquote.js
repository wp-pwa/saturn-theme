import Color from 'color-js';
import { css } from 'styled-components';

export default {
  test: ({ tagName }) => tagName === 'blockquote',
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

    if (element.attributes.className) {
      element.attributes.className.push(blockquoteClass);
    } else {
      element.attributes.className = [blockquoteClass];
    }

    return element;
  },
};
