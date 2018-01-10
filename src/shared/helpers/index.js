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

// This function gets the main theme color from database end returns the theme props.
export const getThemeProps = color => ({
  colors: {
    background: color,
    text: getBlackOrWhite(color),
    link: darkenColor(color),
    shadow: '#999',
    white: '#FFF',
    grey: '#AAA',
    black: '#333',
    facebook: '#3b5998',
    twitter: '#1da1f2',
    whatsapp: '#2cb742',
    email: '#7f7f7f',
    share: '#006ca0',
    google: '#db4437',
    telegram: '#0088cc',
    pinterest: '#cb2128',
    linkedin: '#0077b5',
    copy: '#8fa9ba'
  },
  heights: {
    bar: '56px',
    navbar: '30px'
  },
  logoFontSize: '1.3rem'
});

// This function iterates the element object recursively until it finds an 'Element'
// with tagName 'a' and its 'href' attribute matches a RegExp that captures a tweet ID.
export const getTweetId = children => {
  if (!children) return '';

  const results = [];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];

    if (child.type === 'Element' && child.tagName === 'a') {
      const match = child.attributes.href.match(/\/status\/(\d+)/);

      if (match) return match[1];
    }

    if (child.children) results.push(getTweetId(child.children));
  }

  return results.reduce((result, current) => current || result, '');
};

// This function iterates the element object recursively until it finds an 'Element'
// with tagName 'a' and its 'href' attribute matches a RegExp that captures an instagram ID.
export const getInstagramId = children => {
  if (!children) return '';

  const results = [];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];

    if (child.type === 'Element' && child.tagName === 'a') {
      const match = child.attributes.href.match(/https:\/\/www\.instagram\.com\/p\/([\w\d]+)/);

      if (match) return match[1];
    }

    if (child.children) results.push(getInstagramId(child.children));
  }

  return results.reduce((result, current) => current || result, '');
};
