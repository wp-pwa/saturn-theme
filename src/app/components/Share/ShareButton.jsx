import React, { PropTypes } from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';
import { connect } from 'react-redux';
import * as selectors from '../../selectors';
import styles from './styles.css';

const mapTypeToName = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  telegram: 'Telegram',
  whatsapp: 'Whatsapp',
  google: 'GooglePlus',
  linkedin: 'Linkedin',
  pinterest: 'Pinterest',
  vk: 'VK',
  ok: 'OK',
  reddit: 'Reddit',
};

const ShareButton = ({
  url,
  type,
  buttonText,
  countText,
  title,
  description,
  picture,
  via,
  hashtags,
  separator,
  image,
  media,
  counts,
}) => {
  const Button = ShareButtons[`${mapTypeToName[type]}ShareButton`];
  const Icon = generateShareIcon(type);

  return (
    <Button
      className={styles.shareButton}
      url={url}
      title={title}
      description={description}
      picture={picture}
      via={via}
      hashtags={hashtags}
      separator={separator}
      image={image}
      media={media}
    >
      <Icon className={styles.icon} size={40} round />
      <div className={styles.count}>
        {countText && !!counts[type]
          ? <span className={styles.countValue}>
            {counts[type]}
          </span>
          : ''}
        {countText && !!counts[type]
          ? <span className={styles.countText}>
            {countText}
          </span>
          : ''}
      </div>
      <div className={`${styles.button} ${styles[type]}`}>
        {buttonText}
      </div>
    </Button>
  );
};

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  countText: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  picture: PropTypes.string,
  via: PropTypes.string,
  hashtags: PropTypes.string,
  separator: PropTypes.string,
  image: PropTypes.string,
  media: PropTypes.string,
  counts: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  counts: selectors.shareModal.getCurrentCounts(state),
});

export default connect(mapStateToProps)(ShareButton);
