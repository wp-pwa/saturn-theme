/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';

import styles from './styles.css';

const Content = ({ content }) =>
  <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />;

Content.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Content;
