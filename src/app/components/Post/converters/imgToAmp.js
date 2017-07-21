import AmpComponent from '../../AmpComponent';

export default {
  test: element => element.tagName === 'img',
  converter: element => {
    const converted = { ...element };
    converted.tagName = AmpComponent;
    converted.attributes = {
      ...element.attributes,
      ampTag: 'amp-img',
      layout: 'responsive',
      width: element.attributes.width || '640',
      height: element.attributes.height || '360',
    };
    return converted;
  },
};
