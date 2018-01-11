/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { flow } from 'lodash';
import himalaya from 'himalaya';
import he from 'he';

import injector from './injector';
import { filter } from './filter';

class HtmlToReactConverter extends React.Component {
  static propTypes = {
    html: PropTypes.string.isRequired,
    adsConfig: PropTypes.shape({}),
    converters: PropTypes.arrayOf(PropTypes.shape({})),
    extraProps: PropTypes.shape({})
  };

  static defaultProps = {
    adsConfig: null,
    converters: [],
    extraProps: {}
  };

  constructor(props) {
    super(props);
    const { converters, extraProps } = this.props;
    this.handleNode = this.handleNode.bind(this);
    this.convert = converters
      ? flow(converters.map(({ test, converter }) => e => (test(e) ? converter(e, extraProps) : e))).bind(this)
      : element => element;
  }

  shouldComponentUpdate() {
    return false;
  }

  handleNode({ element: e, index }) {
    // Applies conversion if needed
    const conversion = this.convert(e);
    const converted = e !== conversion;
    const requiresChildren = typeof conversion === 'function';

    const handleNodes = nodes =>
      nodes.length === 1
        ? this.handleNode({ element: nodes[0], index: 0 })
        : nodes.map((el, i) => this.handleNode({ element: el, index: i }));

    switch (e.type) {
      case 'Element': {
        if (e.tagName === 'head') {
          return null;
        }

        if (['!doctype', 'html', 'body'].includes(e.tagName)) {
          return e.children.map((el, i) => this.handleNode({ element: el, index: i }));
        }

        // const props = extraProps[e.tagName];
        // if (props) e.attributes = { ...e.attributes, ...props };

        if (e.children && e.children.length > 0) {
          return converted && requiresChildren ? (
            conversion(handleNodes(e.children))
          ) : (
            <e.tagName {...filter(e.attributes)} key={index}>
              {handleNodes(e.children)}
            </e.tagName>
          );
        }
        return converted ? conversion : <e.tagName {...filter(e.attributes)} key={index} />;
      }
      case 'Text':
        return he.decode(e.content);
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

export default HtmlToReactConverter;
