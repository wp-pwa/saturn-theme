import Color from 'color';

export const darkenColor = colorCode => {
  const white = new Color('white');
  let color = new Color(colorCode);
  while (color.contrast(white) < 6) {
    color = color.darken(0.1);
  }
  return color;
};

export const blackOrWhite = colorCode =>
  new Color(colorCode).contrast(new Color('white')) > 2.3 ? '#FFF' : '#000';
