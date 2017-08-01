/* global sas */
import React, { PropTypes } from 'react';
import { compose, lifecycle } from 'recompose';

import styles from './styles.css';

const Ad = ({ siteId, pageId, formatId, width, height, target }) => (// eslint-disable-line
  <div className={styles.ad}>
    <div id={`sas_${formatId}`} />
  </div>
);

Ad.propTypes = {
  siteId: PropTypes.number.isRequired,
  pageId: PropTypes.number.isRequired,
  formatId: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  target: PropTypes.string,
};

export default compose(
  lifecycle({
    componentDidMount() {
      const { siteId, pageId, formatId, width, height, target } = this.props;
      sas.call('iframe', {
        siteId,
        pageId,
        formatId,
        width,
        height,
        target,
        allowtransparency: true,
        async: true,
      });
    },
    shouldComponentUpdate() {
      return false;
    },
  })
)(Ad);
