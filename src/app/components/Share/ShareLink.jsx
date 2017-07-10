import React, { PropTypes } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ClipboardIcon from 'react-clipboard-icon';
import styles from './styles.css';

const ShareLink = ({
  url,
  buttonMessage,
}) =>
  <div className={styles.shareButton}>
    <div className={`${styles.icon} ${styles.iconLink}`}>
      <ClipboardIcon
        size={20}
        style={{ fill: 'white' }}
      />
    </div>
    <div className={styles.link}>
      {url}
    </div>
    <CopyToClipboard
      text={url}
      onCopy={() => {}}
    >
      <div className={`${styles.button}`}>
        {buttonMessage}
      </div>
    </CopyToClipboard>
  </div>;


ShareLink.propTypes = {
  url: PropTypes.string.isRequired,
  buttonMessage: PropTypes.string.isRequired,
};

export default ShareLink;
