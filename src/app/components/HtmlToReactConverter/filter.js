import htmlMap from './htmlMap';
import svgMap from './svgMap';

const allMap = { ...htmlMap, ...svgMap };

const camelCaseToDash = str => str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);

export const replaceDataAttrs = dataset => {
  const toReturn = {};
  if (dataset) {
    for (const [key, value] of Object.entries(dataset)) {
      toReturn[`data-${camelCaseToDash(key)}`] = value;
    }
  }
  return toReturn;
};

export const replaceAttrs = attributes => {
  const toReturn = {};
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      const newKey = allMap[key.toLowerCase()];
      toReturn[newKey && newKey !== key ? newKey : key] =
        value instanceof Array ? value.join(' ') : value;
    }
  }
  return toReturn;
};

export const filter = attributes => {
  const { dataset, ...others } = attributes;
  return { ...replaceDataAttrs(dataset), ...replaceAttrs(others) };
};
