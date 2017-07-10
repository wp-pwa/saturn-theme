import React, { PropTypes } from 'react';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import styles from './styles.css';

const ShareEmail = ({
  url,
  title,
  buttonMessage,
}) =>
  <a className={styles.shareButton} href={`mailto:?body=${encodeURIComponent(`${title}\n${url}`)}`}>
    <div className={`${styles.icon} ${styles.iconLink}`}>
      <FaEnvelope
        size={20}
        color={'white'}
        style={{ margin: '10px 0 0 10px' }}
      />
    </div>
    <div className={styles.count} />
    <div className={`${styles.button}`}>
      {buttonMessage}
    </div>
  </a>;


ShareEmail.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonMessage: PropTypes.string.isRequired,
};

export default ShareEmail;
