import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import GoLink from 'react-icons/lib/go/link';
import styles from './styles.css';
import * as selectors from '../../selectors';
import * as actions from '../../actions';

const ShareLink = ({
  url,
  buttonText,
  buttonTextOnClick,
  onLinkCopied,
  linkCopied,
}) =>
  <div className={`${styles.shareButton} ${styles.shareLink}`}>
    <div className={`${styles.icon} ${styles.iconLink}`}>
      <GoLink
        size={20}
        style={{ fill: 'white', margin: '10px 0 0 10px' }}
      />
    </div>
    <div className={styles.link}>
      {url}
    </div>
    <CopyToClipboard
      text={url}
      onCopy={onLinkCopied}
    >
      <button className={`${styles.button} ${linkCopied && styles.linkCopied}`} >
        <span className={styles.text}>{buttonText}</span>
        <span className={styles.textOnClick}>{buttonTextOnClick}</span>
      </button>
    </CopyToClipboard>
  </div>;


ShareLink.propTypes = {
  url: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonTextOnClick: PropTypes.string.isRequired,
  onLinkCopied: PropTypes.func,
  linkCopied: PropTypes.bool,
};

const mapStateToProps = state => ({
  linkCopied: selectors.shareModal.isLinkCopied(state),
});

const mapDispatchToProps = dispatch => ({
  onLinkCopied: () => {
    dispatch(actions.setLinkCopied({ value: true }));
    setTimeout(() => dispatch(actions.setLinkCopied({ value: false })), 1000);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareLink);
