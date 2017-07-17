/* eslint-disable react/prop-types */
import React, { PropTypes } from 'react';
import { flow } from 'lodash';
import himalaya from 'himalaya';
import he from 'he';

const filter = attributes => {
  const { srcset, ...rest } = attributes;
  return { srcSet: srcset, ...rest };
};

const handleNode = ({ element, index, convert }) => {
  const e = convert(element);
  switch (element.type) {
    case 'Element':
      return e.children && e.children.length > 0
        ? <e.tagName {...filter(e.attributes)} key={index}>
          {e.children.map((el, i) => handleNode({ element: el, index: i, convert }))}
        </e.tagName>
        : <e.tagName {...filter(e.attributes)} key={index} />;
    case 'Text':
      return he.decode(element.content);
    default:
      return false;
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
  converters: PropTypes.shape([]),
};

export default HtmlToReactConverter;
