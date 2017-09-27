/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import HtmlToReactConverter from '../HtmlToReactConverter';
import converters from '../../libs/converters';
import Ad from '../Ad';
import * as selectorCreators from '../../selectorCreators';
import * as selectors from '../../selectors';

class Content extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.content !== nextProps.content) return true;

    return false;
  }

  render() {
    const { ssr, content, slide, adsConfig } = this.props;
    const extraProps = { [Ad]: { slide } };

    return (
      <Container>
        <HtmlToReactConverter
          html={content}
          converters={converters}
          extraProps={extraProps}
          adsConfig={adsConfig}
        />
      </Container>
    );
  }
}

Content.propTypes = {
  ssr: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  slide: PropTypes.number,
  adsConfig: PropTypes.shape({}),
};

const mapStateToProps = (state, { id, type }) => ({
  ssr: dep('build', 'selectors', 'getSsr')(state),
  content: selectorCreators[type].getContent(id)(state),
  adsConfig: selectors.ads.getConfig(state),
});

export default connect(mapStateToProps)(Content);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  width: 100%;

  * {
    max-width: 100%;
  }

  a {
    font-size: inherit;
    text-decoration: underline;
    color: ${({ theme }) => theme.bgColor};
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

  ul {
    margin: 15px;
  }

  div.video-container {
    margin: 20px 0;
  }

  div.gallery {
    display: flex;
    justify-content: center;
    padding: 0 15px;
    margin: 30px 0 !important;
  }

  figure {
    box-sizing: border-box;
    margin: 15px 0;
    margin-top: 30px;
    padding: 0 15px;
    width: 100% !important;
  }

  blockquote {
    margin: 30px 15px;
    padding: 10px;
  }

  blockquote p:nth-child(2) {
    text-align: right;
    padding-left: 25%;
  }

  blockquote::after {
    content: '';
  }

  aside {
    box-sizing: border-box;
    box-shadow: 0 0 3px 0 #333;
    margin: 30px 15px;
    display: flex;
  }
`;
