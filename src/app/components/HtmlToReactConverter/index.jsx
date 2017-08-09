/* eslint-disable react/prop-types */
import React, { PropTypes } from 'react';
import { flow } from 'lodash';
import himalaya from 'himalaya';
import he from 'he';

import adsInjector from './adsInjector';
import Ad from '../Ad';
import { filter } from './filter';

const handleNode = ({ element, index, convert, slide }) => {
  const e = convert(element);

  switch (element.type) {
    case 'Element':
      if (element.tagName === 'head') {
        return null;
      }
      if (['!doctype', 'html', 'body'].includes(element.tagName)) {
        return e.children.map((el, i) => handleNode({ element: el, index: i, convert }));
      }

      const { defaultProps } = e.tagName;
      if (defaultProps && defaultProps.slide) e.attributes.slide = slide;

      const { WrappedComponent } = e.tagName;
      if (WrappedComponent && WrappedComponent.propTypes.slide) e.attributes.slide = slide;

      if (e.children && e.children.length > 0) {
        return (
          <e.tagName {...filter(e.attributes)} key={index}>
            {e.children.length === 1
              ? handleNode({ element: e.children[0], index: 0, convert })
              : e.children.map((el, i) => handleNode({ element: el, index: i, convert }))}
          </e.tagName>
        );
      }
      return <e.tagName {...filter(e.attributes)} key={index} />;
    case 'Text':
      return he.decode(element.content);
    default:
      return null;
  }
};

const HtmlToReactConverter = ({ html, converters, slide }) => {
  const json = himalaya.parse(html);
  const convert = converters
    ? flow(converters.map(({ test, converter }) => e => (test(e) ? converter(e) : e)))
    : element => element;
  adsInjector(json);
  return (
    <div>
      {json.map((element, index) => handleNode({ element, index, convert, slide }))}
    </div>
  );
};

HtmlToReactConverter.propTypes = {
  html: PropTypes.string.isRequired,
  converters: PropTypes.arrayOf(PropTypes.shape({})),
  slide: PropTypes.number,
};

export default HtmlToReactConverter;
