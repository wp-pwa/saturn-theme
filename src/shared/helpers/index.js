import Color from 'color-js';
import himalaya from 'himalaya';
import he from 'he';

// This function returns the contrast between two colors.
export const getContrast = (color1, color2) => {
  const lum1 = color1.getLuminance();
  const lum2 = color2.getLuminance();

  if (lum1 > lum2) {
    return (lum1 + 0.05) / (lum2 + 0.05);
  }

  return (lum2 + 0.05) / (lum1 + 0.05);
};

// This function darkens a color if the contrast between it and white is low.
export const darkenColor = colorCode => {
  const white = Color('white');
  let color = Color(colorCode);

  while (getContrast(color, white) < 3) {
    color = color.darkenByAmount(0.1);
  }

  return color.toString();
};

// This function gets a color and returns the color black or white depending on contrast.
export const getBlackOrWhite = colorCode => {
  const color = Color(colorCode);
  const white = Color('white');

  return getContrast(color, white) > 1.6 ? '#FFF' : '#000';
};

// This function gets a string with html and returns only the text inside.
export const getInnerText = htmlString => {
  const getElementText = ({ type, content, children }) =>
    type === 'Text'
      ? he.decode(content)
      : children.reduce((t, e) => t.concat(getElementText(e)), '');

  return himalaya.parse(htmlString).reduce((t, e) => t.concat(getElementText(e)), '');
};
