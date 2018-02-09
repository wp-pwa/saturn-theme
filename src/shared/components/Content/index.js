/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import HtmlToReactConverter from '../HtmlToReactConverter';
import processors from '../../processors';
import converters from '../../converters';
import Ad from '../Ad';
import * as selectors from '../../../pwa/selectors';

const translate = ({ type, props, children }, options) => ({
  element: {
    type: 'Element',
    tagName: type,
    attributes: { ...props },
    children: children || []
  },
  ...options
});

class Content extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    content: PropTypes.string.isRequired,
    elementsToInject: PropTypes.arrayOf(PropTypes.shape({})),
    adsConfig: PropTypes.shape({}),
  };

  static defaultProps = {
    elementsToInject: [],
    adsConfig: null,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { content, adsConfig, elementsToInject, type, id } = this.props;
    const extraProps = { item: { type, id } };

    let atTheBeginning = false;
    let atTheEnd = false;
    let ads = [];

    if (adsConfig) {
      const { adList } = adsConfig;
      atTheBeginning = adsConfig.atTheBeginning;
      atTheEnd = adsConfig.atTheEnd;

      ads = adList.map(ad => ({
        element: {
          type: 'Element',
          tagName: Ad,
          attributes: { ...ad },
          children: []
        }
      }));
    }

    const toInject = elementsToInject.reduce((sum, { index, value, ...options }) => {
      sum.splice(index, 0, translate(value, options));
      return sum;
    }, ads);

    return (
      <Container>
        <HtmlToReactConverter
          html={content}
          processors={processors}
          converters={converters}
          extraProps={extraProps}
          toInject={toInject}
          atTheBeginning={atTheBeginning}
          atTheEnd={atTheEnd}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  adsConfig: selectors.ads.getConfig(state)
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { id, type }) => ({
    content: connection.single[type][id].content
  }))
)(Content);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  width: 100%;

  * {
    max-width: 100%;
  }

  a,
  a:visited {
    font-size: inherit;
  }

  h1,
  h2 {
    padding: 0 15px;
    font-size: 1.5rem;
    margin: 15px 0;
    margin-top: 30px;
  }

  h3,
  h4,
  h5,
  h6 {
    padding: 0 15px;
    margin: 15px 0;
    margin-top: 30px;
  }

  p {
    margin: 15px 0;
    padding: 0 15px;
    hyphens: auto;
  }

  strong {
    font-size: inherit;
  }

  & > ul {
    margin: 15px;
  }

  div.video-container {
    margin: 20px 0;
  }

  div.gallery {
    display: flex;
    justify-content: center;
    padding: 0 15px;
    margin: 30px 0;
  }

  figure {
    box-sizing: border-box;
    margin: 15px 0;
    width: 100%;
    max-width: none;

    & > div {
      margin: 0;
    }
  }

  figcaption {
    padding: 5px 15px 0 15px;
    font-size: 0.8rem;
  }

  blockquote {
    display: block;
    position: relative;
    font-style: italic;
    background: #e0e0e0;
    margin: 30px 15px;
    padding: 10px;
    border-left: 0.25rem solid #666666;
    border-radius: 0 0.1875rem 0.1875rem 0;
  }

  blockquote:after {
    position: absolute;
    font-style: normal;
    font-size: 0.875rem;
    color: #616161;
    left: 0.625rem;
    bottom: 0;
    content: '';
  }

  blockquote p:nth-child(2) {
    text-align: right;
    padding-left: 25%;
  }

  aside {
    box-sizing: border-box;
    box-shadow: 0 0 3px 0 #333;
    margin: 30px 15px;
    display: flex;
  }

  pre {
    box-sizing: border-box;
    border-left: 5px solid steelblue;
    margin: 15px;
    padding: 10px 15px;
    font-weight: 100;
    background-color: #333;
    color: #fff;
    overflow-x: auto;
  }
`;
