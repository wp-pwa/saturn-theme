import htmlMap from './htmlMap';
import svgMap from './svgMap';

const allMap = { ...htmlMap, ...svgMap };

export const replaceAttrs = attributes => {
  const toReturn = {};
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      if (!(/^on/.test(key) && typeof value === 'string')) {
        // ignores 'onEvent' attributes
        const newKey = allMap[key.toLowerCase()];
        toReturn[newKey && newKey !== key ? newKey : key] = value;
      }
    });
  }
  return toReturn;
};

export const filterAllow = allow => {
  if (allow) {
    return allow
      .split(';')
      .map(i => i.trim())
      .filter(i => i !== 'autoplay')
      .join('; ');
  }

  return allow;
};

export default (attributes = {}) => {
  const { allow, controls, ...others } = attributes;
  return { ...replaceAttrs(others) };
};
