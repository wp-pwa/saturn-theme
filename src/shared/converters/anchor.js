import { css } from 'react-emotion';

export default {
  test: ({ tagName }) => tagName === 'a',
  converter: (element, _extraProps, state) => {
    let linkClass;

    if (state) {
      const { linkStyles } = state.settings.collection.theme;

      linkClass = css`
        color: ${linkStyles.color};
        font-weight: ${linkStyles.bold ? 'bold' : 'normal'};
        text-decoration: ${linkStyles.underline ? 'underline' : 'none'};
      `;
    } else {
      linkClass = css`
        color: #000;
        font-weight: normal;
        text-decoration: underline;
      `;
    }

    if (element.attributes.className) {
      element.attributes.className = `${element.attributes.className} ${linkClass}`;
    } else {
      element.attributes.className = linkClass;
    }

    return element;
  }
};
