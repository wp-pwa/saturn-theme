import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectors } from '../../deps';

import Spinner from '../../elements/Spinner';
import Content from '../../elements/Content';

import styles from './styles.css';

const Page = ({ page, isPageReady }) => {
  if (!isPageReady) {
    return (
      <div className={styles.wrap}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Content content={page.content.rendered} />
    </div>
  );
};

Page.propTypes = {
  page: PropTypes.shape({}),
  isPageReady: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  page: selectors.getCurrentSingle(state),
  isPageReady: selectors.isCurrentSingleReady(state),
});

export default connect(mapStateToProps)(Page);
