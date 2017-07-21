import AmpComponent from '../../AmpComponent';

export default {
  test: element =>
    element.tagName === 'iframe' && /youtube\.com\/embed/.test(element.attributes.src),
  converter: element => {
    const videoid = /embed\/([\w-]+)/.exec(element.attributes.src);
    if (videoid && videoid[1]) {
      const converted = { ...element };
      converted.tagName = AmpComponent;
      const { src, ...attributes } = element.attributes; // eslint-disable-line
      converted.attributes = {
        // ...attributes,
        ampScript: 'https://cdn.ampproject.org/v0/amp-youtube-0.1.js',
        'data-videoid': videoid[1],
        ampTag: 'amp-youtube',
        layout: 'responsive',
        width: element.attributes.width || '480',
        height: element.attributes.height || '270',
      };
      return converted;
    }
    return element;
  },
};
