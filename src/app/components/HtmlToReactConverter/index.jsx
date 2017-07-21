/* eslint-disable react/prop-types */
import React, { PropTypes } from 'react';
import { flow } from 'lodash';
import himalaya from 'himalaya';
import he from 'he';
// import LazyLoad from 'react-lazyload';

import { filter } from './filter';

const handleNode = ({ element, index, convert }) => {
  const e = convert(element);
  // if (e.tagName === LazyLoad || e.tagName === 'img') debugger;
  switch (element.type) {
    case 'Element':
      if (element.tagName === 'head') {
        return null;
      }
      if (['!doctype', 'html', 'body'].includes(element.tagName)) {
        return e.children.map((el, i) => handleNode({ element: el, index: i, convert }));
      }
      if (e.children && e.children.length > 0) {
        return (
          <e.tagName {...filter(e.attributes)} key={index}>
            {e.children.map((el, i) => handleNode({ element: el, index: i, convert }))}
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

const HtmlToReactConverter = ({ html, converters }) => {
  const json = himalaya.parse(html);
  const convert = converters
    ? flow(converters.map(({ test, converter }) => e => (test(e) ? converter(e) : e)))
    : element => element;
  return (
    <div>
      {json.map((element, index) => handleNode({ element, index, convert }))}
    </div>
  );
};

HtmlToReactConverter.propTypes = {
  html: PropTypes.string.isRequired,
  converters: PropTypes.arrayOf(PropTypes.shape({})),
};

export default HtmlToReactConverter;
