import React, { PropTypes } from 'react';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';
import styles from './styles.css';

const mapTypeToIcon = {
  Facebook: 'facebook',
  Twitter: 'twitter',
  Telegram: 'telegram',
  Whatsapp: 'whatsapp',
  GooglePlus: 'google',
  Linkedin: 'linkedin',
  Pinterest: 'pinterest',
  VK: 'vk',
  OK: 'ok',
  Reddit: 'reddit',
};

const ShareButton = ({
  url,
  type,
  buttonMessage,
  showUrl,
  countMessage,
  title,
  description,
  picture,
  via,
  hashtags,
  separator,
  image,
  media,
}) => {
  const Button = ShareButtons[`${type}ShareButton`];
  const ShareCount = ShareCounts[`${type}ShareCount`];
  const Icon = generateShareIcon(mapTypeToIcon[type]);

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
        {countMessage ? <ShareCount className={styles.countValue} url={url} /> : ''}
        {countMessage
          ? <span className={styles.countMessage}>
            {countMessage}
          </span>
          : ''}
        {showUrl
          ? <span>
            {url}
          </span>
          : ''}
      </div>
      <div className={styles.button}>
        {buttonMessage}
      </div>
    </Button>
  );
};

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  buttonMessage: PropTypes.string.isRequired,
  showUrl: PropTypes.bool,
  countMessage: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  picture: PropTypes.string,
  via: PropTypes.string,
  hashtags: PropTypes.string,
  separator: PropTypes.string,
  image: PropTypes.string,
  media: PropTypes.string,
};

export default ShareButton;
