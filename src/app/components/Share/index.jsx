/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { compose, lifecycle } from 'recompose';
// import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';
import IconClose from 'react-icons/lib/md/close';

import * as actions from '../../actions';
import * as selectors from '../../selectors';

import styles from './styles.css';

const Share = ({ isOpen, id, type, goBack }) =>
  <div className={`${styles.modalWrapper} ${isOpen && styles.modalOpen}`}>
    <div className={styles.bgOverlay} onClick={goBack} />
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <span className={styles.totalShares}>
          {type} - {id}
        </span>
        <IconClose className={styles.closeButton} size={33} onClick={goBack} />
      </div>
      <div className={styles.modalBody}>
        <div className={styles.preview}>
          <h1 className={styles.title}>{}</h1>
        </div>
        <div className={styles.modalList} />
      </div>
    </div>
  </div>;

Share.propTypes = {
  isOpen: PropTypes.bool,
  id: PropTypes.number,
  type: PropTypes.string,
  goBack: PropTypes.func,
};

const mapStateToProps = state => ({
  isOpen: selectors.shareModalIsOpen(state),
  id: selectors.shareModalId(state),
  type: selectors.shareModalType(state),
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(actions.closeShareModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Share);
