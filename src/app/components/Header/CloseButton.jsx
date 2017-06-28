import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import IconClose from 'react-icons/lib/md/close';
import { libs, selectors } from '../../deps';

import styles from './styles.css';

const CloseButton = ({ goBack }) =>
  <div className={styles.titleCloseButton}>
    <IconClose size={33} onClick={goBack} />
  </div>;

CloseButton.propTypes = {
  goBack: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  historyLength: selectors.getHistoryLength(state),
});

const mergeProps = ({ historyLength }) => ({
  goBack() {
    if (historyLength > 1) libs.goBack();
    else libs.push('?');
  },
});

export default connect(mapStateToProps, null, mergeProps)(CloseButton);
