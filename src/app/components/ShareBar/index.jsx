import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ShareButtons, generateShareIcon } from 'react-share';
import EmailIcon from 'react-icons/lib/fa/envelope';
import ShareIcon from 'react-icons/lib/md/share';
import NextIcon from 'react-icons/lib/fa/angle-right';

import * as actions from '../../actions';
import * as deps from '../../deps';

import styles from './styles.css';

const { FacebookShareButton, WhatsappShareButton, TwitterShareButton } = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const WhatsappIcon = generateShareIcon('whatsapp');
const TwitterIcon = generateShareIcon('twitter');

const ShareBar = ({ entity, openShareModal }) =>
  <aside className={styles.shareBar}>
    <WhatsappShareButton className={styles.button} url={entity.link} title={entity.title.rendered}>
      <WhatsappIcon size={40} round />
    </WhatsappShareButton>
    <FacebookShareButton className={styles.button} url={entity.link} title={entity.title.rendered}>
      <FacebookIcon size={40} round />
    </FacebookShareButton>
    <TwitterShareButton className={styles.button} url={entity.link} title={entity.title.rendered}>
      <TwitterIcon size={40} round />
    </TwitterShareButton>
    <a
      className={`${styles.button} ${styles.email}`}
      href={`mailto:?body=${encodeURIComponent(`${entity.title.rendered}\n${entity.link}`)}`}
    >
      <EmailIcon size={20} style={{ fill: 'white', margin: '10px' }} />
    </a>
    <button
      className={`${styles.button} ${styles.others}`}
      onClick={() => openShareModal({ id: entity.id, wpType: `${entity.type}s` })}
    >
      <ShareIcon size={22} style={{ fill: 'white', margin: '9px' }} />
    </button>
    <button className={styles.nextPost}>
      <span>{'SIGUIENTE'} </span>
      <NextIcon />
    </button>
  </aside>;

ShareBar.propTypes = {
  entity: PropTypes.shape({}).isRequired,
  openShareModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  entity: deps.selectors.getCurrentSingle(state),
});

const mapDispatchToProps = dispatch => ({
  openShareModal: ({ id, wpType }) => dispatch(actions.shareModal.open({ id, wpType })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareBar);
