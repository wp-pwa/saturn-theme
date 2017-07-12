/* eslint-disable jsx-a11y/no-static-element-interactions, react/no-danger */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import IconClose from 'react-icons/lib/md/close';

import Media from '../Media';

import * as selectors from '../../selectors';
import * as actions from '../../actions';
import * as deps from '../../deps';

import ShareLink from './ShareLink';
import ShareButton from './ShareButton';
import ShareEmail from './ShareEmail';

import styles from './styles.css';

const Share = ({ isOpen, entity, media, goBack, countsReady, totalShares }) => (
  <div className={`${styles.modalWrapper} ${isOpen && styles.modalOpen}`}>
    <div className={styles.bgOverlay} onClick={goBack} />
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <div className={`${styles.totalShares} ${countsReady && styles.visible}`}>
          <span className={styles.value}>{totalShares}</span> Compartidos
          </div>
        <IconClose className={styles.closeButton} size={33} onClick={goBack} />
      </div>
      {!!entity &&
      <div className={styles.modalBody}>
        <div className={styles.preview}>
          <Media media={media[entity.featured_media]} className={styles.thumbnail} />
          <h1
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: entity.title.rendered }}
          />
        </div>
        <ul className={styles.modalList}>
          <li>
            <ShareLink url={entity.link} buttonMessage="COPIAR" />
          </li>
          <li>
            <ShareButton
              title={entity.title.rendered}
              url={entity.link}
              type="facebook"
              countMessage="Compartidos"
              buttonMessage="COMPARTIR"
            />
          </li>
          <li>
            <ShareButton
              title={entity.title.rendered}
              url={entity.link}
              type="whatsapp"
              buttonMessage="Compartir"
            />
          </li>
          <li>
            <ShareButton
              title={entity.title.rendered}
              url={entity.link}
              type="twitter"
              buttonMessage="TUITEAR"
            />
          </li>
          <li>
            <ShareButton
              title={entity.title.rendered}
              url={entity.link}
              type="google"
              countMessage="Compartidos"
              buttonMessage="COMPARTIR"
            />
          </li>
          <li>
            <ShareEmail
              title={entity.title.rendered}
              url={entity.link}
              buttonMessage="ENVIAR"
            />
          </li>
        </ul>
      </div>}
    </div>
  </div>
  );

Share.propTypes = {
  isOpen: PropTypes.bool,
  entity: PropTypes.shape({}),
  media: PropTypes.shape({}),
  goBack: PropTypes.func,
  countsReady: PropTypes.bool,
  totalShares: PropTypes.number,
};

const mapStateToProps = state => ({
  isOpen: selectors.getShareModalOpen(state),
  entity: selectors.getEntityToShare(state),
  media: deps.selectors.getMediaEntities(state),
  countsReady: selectors.areCurrentCountsReady(state),
  totalShares: selectors.getCurrentTotalShares(state),
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(actions.closeShareModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Share);
