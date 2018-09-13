import { css } from 'react-emotion';

export default {
  test: ({ component }) => component === 'a',
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

    const { className } = element.attributes;
    element.attributes.className = className
      ? `${className} ${linkClass}`
      : linkClass;

    return element;
  },
};
