/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
    this.convert = this.convert.bind(this);
    this.handleNode = this.handleNode.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  convert(element) {
    const { converters, extraProps } = this.props;
    const match = converters.find(({ test }) => test(element));
    return match ? match.converter(element, extraProps) : element;
  }

  handleNode({ element: e, index }) {
    const { extraProps } = this.props;
    // Applies conversion if needed
    const conversion = this.convert(e);
    const requiresChildren = typeof conversion === 'function';
    const converted = e !== conversion;

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

        if (converted) {
          return (
            <Fragment key={index}>
              {requiresChildren ? conversion(handleNodes(e.children)) : conversion}
            </Fragment>
          );
        } else if (e.children && e.children.length > 0) {
          return (
            <e.tagName {...filter(e.attributes)} {...extraProps} key={index}>
              {e.children.length > 1
                ? handleNodes(e.children)
                : this.handleNode({ element: e.children[0] })}
            </e.tagName>
          );
        }
        return <e.tagName {...filter(e.attributes)} {...extraProps} key={index} />;
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

    return htmlTree.map((element, index) => this.handleNode({ element, index }));
  }
}

export default HtmlToReactConverter;
