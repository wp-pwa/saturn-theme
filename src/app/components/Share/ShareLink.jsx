import React, { PropTypes } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import GoClippy from 'react-icons/lib/go/clippy';
import styles from './styles.css';

const ShareLink = ({
  url,
  buttonText,
}) =>
  <div className={styles.shareButton}>
    <div className={`${styles.icon} ${styles.iconLink}`}>
      <GoClippy
        size={20}
        style={{ fill: 'white', margin: '10px 0 0 12px' }}
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
        {buttonText}
      </div>
    </CopyToClipboard>
  </div>;


ShareLink.propTypes = {
  url: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default ShareLink;
