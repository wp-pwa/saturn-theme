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
import * as selectorCreators from '../../../pwa/selectorCreators';

const translate = ({ type, props, children }, options) => ({
  element: {
    type: 'Element',
    tagName: type,
    attributes: { ...props },
    children: children || [],
  },
  ...options,
});

class Content extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    content: PropTypes.string.isRequired,
    elementsToInject: PropTypes.arrayOf(PropTypes.shape({})),
    adsOptions: PropTypes.shape({}),
    adsContentFormats: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    elementsToInject: [],
    adsOptions: null,
    adsContentFormats: [],
  };

  render() {
    const { content, adsOptions, adsContentFormats, elementsToInject, type, id } = this.props;
    const extraProps = { item: { type, id } };

    let atTheBeginning = false;
    let atTheEnd = false;
    let adsList = [];

    if (adsOptions && adsContentFormats.length > 0) {
      ({ atTheBeginning, atTheEnd } = adsOptions);

      adsList = adsContentFormats.map(format => ({
        element: {
          type: 'Element',
          tagName: Ad,
          attributes: { ...format },
          children: [],
        },
      }));
    }

    const toInject = elementsToInject.reduce((sum, { index, value, ...options }) => {
      sum.splice(index, 0, translate(value, options));
      return sum;
    }, adsList);

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

const mapStateToProps = (state, { type }) => ({
  adsOptions: selectorCreators.ads.getOptions(type)(state),
  adsContentFormats: selectorCreators.ads.getContentFormats(type)(state),
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { id, type }) => ({
    content: connection.entity(type, id).content,
  })),
)(Content);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  width: 100%;

  & > *:not(.ad):not(.carousel):not(.gallery):not(.wp-video):not(.wpappbox):not(blockquote) {
    padding: 0 15px;
  }

  & > a,
  & > a:visited {
    display: block;
  }

  & > a,
  *:not(.carousel):not(.ad) a,
  & > a:visited,
  *:not(.carousel):not(.ad) a:visited {
    font-size: inherit;
  }

  & > h1,
  *:not(.carousel):not(.ad) h1,
  & > h2,
  :not(.carousel):not(.ad) h2 {
    font-size: 1.5rem;
    margin: 15px 0;
    margin-top: 30px;
  }

  & > h3,
  *:not(.carousel):not(.ad) h3,
  & > h4,
  *:not(.carousel):not(.ad) h4,
  & > h5,
  *:not(.carousel):not(.ad) h5,
  & > h6,
  *:not(.carousel):not(.ad) h6 {
    margin: 15px 0;
    margin-top: 30px;
  }

  & > p,
  *:not(.carousel):not(.ad) p {
    hyphens: auto;
  }

  & > strong,
  *:not(.carousel):not(.ad) strong {
    font-size: inherit;
  }

  & > ul,
  & > ol {
    margin: 15px;

    span {
      max-width: 100%;
      left: 0;
    }
  }

  div.video-container {
    margin: 20px 0;
  }

  div.wp-caption {
    margin: 15px 0;

    span {
      margin: 0;
    }

    p.wp-caption-text {
      margin: 0;
      padding-top: 5px;
      font-size: 0.8rem;
    }
  }

  & > figure,
  *:not(.carousel):not(.ad) figure {
    box-sizing: border-box;
    margin: 15px 0;
    width: 100%;
    max-width: none;

    & > span {
      margin: 0;
    }
  }

  & > figcaption,
  *:not(.carousel):not(.ad) figcaption {
    padding-top: 5px;
    font-size: 0.8rem;
  }

  & > blockquote,
  *:not(.carousel):not(.ad) blockquote {
    display: block;
    position: relative;
    font-style: italic;
    background: #e0e0e0;
    margin: 30px 15px;
    padding: 10px;
    border-left: 0.25rem solid #666666;
    border-radius: 0 0.1875rem 0.1875rem 0;

    p {
      margin: 0;
    }
  }

  & > blockquote:after,
  *:not(.carousel):not(.ad) blockquote:after {
    position: absolute;
    font-style: normal;
    font-size: 0.875rem;
    color: #616161;
    left: 0.625rem;
    bottom: 0;
    content: '';
  }

  & > aside,
  *:not(.carousel):not(.ad) aside {
    box-sizing: border-box;
    box-shadow: 0 0 3px 0 #333;
    margin: 30px 15px;
    display: flex;
  }

  & > pre,
  *:not(.carousel):not(.ad) pre {
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
