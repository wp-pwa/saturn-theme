// import Color from "color";
import Color from 'color-js';
import himalaya from 'himalaya';
import he from 'he';

export const contrast = (color1, color2) => {
  const lum1 = color1.getLuminance();
  const lum2 = color2.getLuminance();

  if (lum1 > lum2) {
    return (lum1 + 0.05) / (lum2 + 0.05);
  }

  return (lum2 + 0.05) / (lum1 + 0.05);
};

export const darkenColor = colorCode => {
  const white = Color('white');
  let color = Color(colorCode);

  while (contrast(color, white) < 3) {
    color = color.darkenByAmount(0.1);
  }

  return color.toString();
};

export const blackOrWhite = colorCode => {
  const color = Color(colorCode);
  const white = Color('white');

  return contrast(color, white) > 1.6 ? '#FFF' : '#000';
};

export const innerText = htmlString => {
  const getElementText = ({ type, content, children }) =>
    type === 'Text'
      ? he.decode(content)
      : children.reduce((t, e) => t.concat(getElementText(e)), '');

  return himalaya.parse(htmlString).reduce((t, e) => t.concat(getElementText(e)), '');
};
