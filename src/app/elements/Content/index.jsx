/* eslint react/no-danger: 0 */
import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import HtmlToReactConverter from '../../components/HtmlToReactConverter';
import converters from '../../libs/converters';

class Content extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.content !== nextProps.content) return true;

    return false;
  }

  render() {
    return (
      <Container>
        <HtmlToReactConverter html={this.props.content} converters={converters} />
      </Container>
    );
  }
}

Content.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Content;

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 15px;
  width: 100%;

  * {
    max-width: 100%;
  }

  a {
    font-size: inherit;
    text-decoration: underline;
    color: steelblue;
  }

  h2 {
    font-size: 1.5rem;
    margin: 15px 0;
    margin-top: 30px;
  }

  p {
    padding: 10px 0;
    margin: 0;
    hyphens: auto;
  }

  strong {
    font-size: inherit;
  }

  div.video-container {
    margin: 20px 0;
  }

  iframe {
    width: 100% !important;
    height: 35vh;
  }

  figure {
    box-sizing: border-box;
    margin: 0;
    padding: 5px;
    width: 100% !important;
  }

  blockquote {
    margin: 20px 10px;
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
    margin: 20px 0;
  }
`;
