/* eslint-disable jest/no-disabled-tests, no-console */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { parse } from 'himalaya';
import { withTheme } from 'emotion-theming';
import { flow } from 'lodash';
import he from 'he';

import applyProcessors from './applyProcessors';
import applyConverters from './applyConverters';
import { filter } from './filter';

import {
  adaptNodes,
  cleanNodes,
  extractFromBody,
  isValidReact,
  extractIfOneChild,
} from './utils';

class HtmlToReactConverter extends React.Component {
  static propTypes = {
    html: PropTypes.string.isRequired,
    theme: PropTypes.shape({}).isRequired,
    stores: PropTypes.shape({}).isRequired,
    processors: PropTypes.arrayOf(PropTypes.shape({})),
    converters: PropTypes.arrayOf(PropTypes.shape({})),
    extraProps: PropTypes.shape({}),
    render: PropTypes.func.isRequired,
  };

  static defaultProps = {
    processors: [],
    converters: [],
    extraProps: {},
  };

  constructor(props) {
    super(props);

    const { extraProps, stores, theme } = props;
    this.payload = { extraProps, stores, theme };
    this.processAndConvert = this.processAndConvert.bind(this);
    this.extractText = this.extractText.bind(this);
    this.transformToReact = this.transformToReact.bind(this);
  }

  processAndConvert(element, index) {
    const { processors, converters } = this.props;

    if (!element.type === 'Element') return element;

    // Process the element
    const eProcessed = applyProcessors(element, processors, this.payload);
    const { children } = eProcessed;

    // Convert if necessary
    const eConverted = applyConverters(eProcessed, converters, this.payload);
    const isConverted = eProcessed !== eConverted;

    if (isConverted) {
      return (
        <Fragment key={index}>
          {typeof eConverted === 'function'
            ? eConverted(
                <Fragment>
                  {extractIfOneChild(
                    children
                      .map(this.processAndConvert)
                      .map(this.transformToReact),
                  )}
                </Fragment>,
              )
            : eConverted}
        </Fragment>
      );
    }

    // Process and convert children before returning the processed element.
    if (children) eProcessed.children = children.map(this.processAndConvert);

    return eProcessed;
  }

  // if (<div>) & has a text child
  // --> transform to <p>
  // else
  // --> remove <div>

  // if (<p>) & has non-phrasing-content child
  // --> divide <p>

  extractText(output, element) {
    const { type, tagName, children = [] } = element;

    if (type === 'Element' && tagName === 'div') {
      if (children.some(child => child.type === 'Text')) {
        element.tagName = 'p';
      } else {
        output.concat(children.reduce(this.extractText, []));
      }
    }

    output.push(element);

    return output;
  }

  transformToReact(element, index) {
    // Element type can only be 'Text', or 'Element'.
    if (element.type === 'Text') return he.decode(element.content);

    // If element is a react element, return element.
    if (isValidReact(element)) return element;

    if (typeof element === 'string' || isValidReact(element)) return element;

    const { attributes, tagName, children } = element;

    return (
      <element.tagName
        key={index}
        {...filter(attributes)}
        {...(typeof tagName === 'function' ? this.payload.extraProps : {})}
      >
        {children && children.length > 0
          ? extractIfOneChild(children.map(this.transformToReact))
          : null}
      </element.tagName>
    );
  }

  render() {
    const { html, render: renderProp } = this.props;

    console.log(html);

    const htmlTree = flow(
      parse,
      cleanNodes,
      extractFromBody,
      adaptNodes,
    )(html);

    const output = flow(
      input => input.map(this.processAndConvert),
      input => input.reduce(this.extractText, []),
      input => input.map(this.transformToReact),
    )(htmlTree);

    console.log(output);

    return renderProp(output);
  }
}

export default withTheme(
  inject(({ stores }) => ({ stores }))(HtmlToReactConverter),
);
