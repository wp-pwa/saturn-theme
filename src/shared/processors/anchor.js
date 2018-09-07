import { css } from 'styled-components';

export default {
  test: ({ tagName }) => tagName === 'a',
  process: (element, { stores, theme }) => {
    let linkClass;

    if (stores && stores.settings.theme.linkStyles) {
      const { linkStyles } = stores.settings.theme;

      linkClass = css`
        color: ${linkStyles.color};
        font-weight: ${linkStyles.bold ? 'bold' : 'normal'};
        text-decoration: ${linkStyles.underline ? 'underline' : 'none'};
      `;
    } else {
      linkClass = css`
        color: ${theme.colors.link};
        font-weight: normal;
        text-decoration: underline;
      `;
    }

    if (element.attributes.className) {
      element.attributes.className.push(linkClass);
    } else {
      element.attributes.className = [linkClass];
    }

    return element;
  },
};
