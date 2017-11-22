/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { flow } from 'lodash';
import himalaya from 'himalaya';
import he from 'he';

import injector from './injector';
import { filter } from './filter';

class HtmlToReactConverter extends React.Component {
  constructor(props) {
    super(props);
    const { converters } = this.props;
    this.handleNode = this.handleNode.bind(this);
    this.convert = converters
      ? flow(converters.map(({ test, converter }) => e => (test(e) ? converter(e) : e))).bind(this)
      : element => element;
  }

  shouldComponentUpdate() {
    return false;
  }

  handleNode({ element, index }) {
    const { extraProps } = this.props;
    const e = this.convert(element);

    if (!e) return null;

    switch (element.type) {
      case 'Element': {
        if (element.tagName === 'head') {
          return null;
        }

        if (['!doctype', 'html', 'body'].includes(element.tagName)) {
          return e.children.map((el, i) => this.handleNode({ element: el, index: i }));
        }

        const props = extraProps[e.tagName];
        if (props) e.attributes = { ...e.attributes, ...props };

        if (e.children && e.children.length > 0) {
          return (
            <e.tagName {...filter(e.attributes)} key={index}>
              {e.children.length === 1
                ? this.handleNode({ element: e.children[0], index: 0 })
                : e.children.map((el, i) => this.handleNode({ element: el, index: i }))}
            </e.tagName>
          );
        }
        return <e.tagName {...filter(e.attributes)} key={index} />;
      }
      case 'Text':
        return he.decode(element.content);
      default:
        return null;
    }
  }

  render() {
    const { html, toInject, atTheBeginning, atTheEnd } = this.props;
    const htmlTree = himalaya.parse(html);

    if (toInject) injector({ htmlTree, toInject, atTheBeginning, atTheEnd });

    return <div>{htmlTree.map((element, index) => this.handleNode({ element, index }))}</div>;
  }
}

HtmlToReactConverter.propTypes = {
  html: PropTypes.string.isRequired,
  adsConfig: PropTypes.shape({}),
  converters: PropTypes.arrayOf(PropTypes.shape({})),
  extraProps: PropTypes.shape({}),
};

HtmlToReactConverter.defaultProps = {
  adsConfig: null,
  converters: [],
  extraProps: {},
};

export default HtmlToReactConverter;
