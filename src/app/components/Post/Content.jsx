/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';

import HtmlToReactConverter from '../HtmlToReactConverter';

import converters from './converters';
import styles from './styles.css';


const Content = ({ content }) =>
  <div className={styles.content}>
    <HtmlToReactConverter
      html={content}
      converters={converters}
    />
  </div>;

Content.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Content;
