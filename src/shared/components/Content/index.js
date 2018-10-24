import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import H2R from '@frontity/h2r/components';
import SlotInjector from '../SlotInjector';

const Content = ({ content, item, linkStyles }) => (
  <Container linkStyles={linkStyles} className="content">
    <SlotInjector isAboveTheFold position="before content" item={item} />
    <H2R html={content} payload={{ item }} />
    <SlotInjector position="after content" item={item} />
  </Container>
);

Content.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mstId: PropTypes.string,
  }).isRequired,
  content: PropTypes.string.isRequired,
  linkStyles: PropTypes.shape({
    color: PropTypes.string,
    bold: PropTypes.bool,
    underline: PropTypes.bool,
  }),
};

Content.defaultProps = {
  linkStyles: {},
};

export default inject(({ stores: { connection, settings } }, { id, type }) => ({
  item: connection.selectedContext.getItem({ item: { type, id } }),
  content: connection.entity(type, id).content,
  linkStyles: settings.theme.linkStyles,
}))(Content);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  p {
    line-height: 1.6;
  }

  &
    > *:not(.ad):not(.carousel):not(.gallery):not(.wp-video):not(.wpappbox):not(blockquote):not(.table):not(.iframe) {
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

  div.gallery {
    span {
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

    & > span,
    & > a > span {
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
    margin: 30px 15px;
    padding: 10px;
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

  .list-disc {
    list-style-type: disc;
  }

  .list-circle {
    list-style-type: circle;
  }

  .list-square {
    list-style-type: square;
  }

  .list-lower-latin {
    list-style-type: lower-latin;
  }

  .list-upper-latin {
    list-style-type: upper-latin;
  }

  .list-lower-roman {
    list-style-type: lower-roman;
  }

  .list-upper-roman {
    list-style-type: upper-roman;
  }

  .list-decimal {
    list-style-type: decimal;
  }

  .content-link {
    color: ${({ theme, linkStyles }) => linkStyles.color || theme.colors.link};
    font-weight: ${({ linkStyles }) => (linkStyles.bold ? 'bold' : 'normal')};
    text-decoration: ${({ linkStyles }) => {
      if (typeof linkStyles.underline === 'undefined') return 'underline';
      return linkStyles.underline ? 'underline' : 'none';
    }};
  }

  .h2r-lazy-placeholder {
    color: #bdbdbd;
  }
`;
