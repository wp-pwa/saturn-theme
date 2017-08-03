/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';
import { compose, lifecycle } from 'recompose';

import HtmlToReactConverter from '../../components/HtmlToReactConverter';

import converters from '../../libs/converters';
import styles from './styles.css';

const Content = ({ content }) => (
  <div className={styles.content}>
    <HtmlToReactConverter html={content} converters={converters} />
  </div>
  );

Content.propTypes = {
  content: PropTypes.string.isRequired,
};

export default compose(
  lifecycle({
    shouldComponentUpdate(nextProps) {
      if (this.props.content !== nextProps.content) return true;
      return false;
    },
  })
)(Content);
