/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';

import HtmlToReactConverter from '../HtmlToReactConverter';
import AmpComponent from '../AmpComponent';

import styles from './styles.css';

const imgToAmp = {
  test: element => element.tagName === 'img',
  converter: element => {
    const converted = { ...element };
    converted.tagName = AmpComponent;
    converted.attributes = {
      ...element.attributes,
      ampTag: 'amp-img',
      layout: 'responsive',
      width: element.attributes.width || '16',
      height: element.attributes.height || '9',
    };
    return converted;
  },
};

const Content = ({ content }) =>
  <div className={styles.content}>
    <HtmlToReactConverter html={content} />
  </div>;

Content.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Content;
