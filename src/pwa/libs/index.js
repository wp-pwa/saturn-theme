import Color from 'color';
import himalaya from 'himalaya';
import he from 'he';

export const darkenColor = colorCode => {
  const white = new Color('white');
  let color = new Color(colorCode);
  while (color.contrast(white) < 3) {
    color = color.darken(0.1);
  }
  return color.toString();
};

export const blackOrWhite = colorCode =>
  new Color(colorCode).contrast(new Color('white')) > 2.3 ? '#FFF' : '#000';

export const innerText = htmlString => {
  const getElementText = ({ type, content, children }) =>
    type === 'Text'
      ? he.decode(content)
      : children.reduce((t, e) => t.concat(getElementText(e)), '');

  return himalaya.parse(htmlString).reduce((t, e) => t.concat(getElementText(e)), '');
};
