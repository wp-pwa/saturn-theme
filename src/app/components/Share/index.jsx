/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import IconClose from 'react-icons/lib/md/close';

import Media from '../Media';

import * as actions from '../../actions';
import * as selectors from '../../selectors';
import * as deps from '../../deps';

import ShareButton from './ShareButton';

import styles from './styles.css';

const Share = ({ isOpen, entity, media, goBack }) =>
  <div className={`${styles.modalWrapper} ${isOpen && styles.modalOpen}`}>
    <div className={styles.bgOverlay} onClick={goBack} />
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <span className={styles.totalShares}>
          {33} Compartidos
        </span>
        <IconClose className={styles.closeButton} size={33} onClick={goBack} />
      </div>
      {!!entity &&
        <div className={styles.modalBody}>
          <div className={styles.preview}>
            <Media media={media[entity.featured_media]} className={styles.thumbnail} />
            <h1 className={styles.title}>
              {entity.title.rendered}
            </h1>
          </div>
          <ul className={styles.modalList}>
            <li>
              <ShareButton
                url={entity.link}
                type="Facebook"
                countMessage="Compartidos"
                buttonMessage="COMPARTIR"
              />
            </li>
            <li>
              <ShareButton
                url={entity.link}
                type="Whatsapp"
                buttonMessage="Compartir"
              />
            </li>
            <li>
              <ShareButton
                url={entity.link}
                type="Twitter"
                buttonMessage="TUIT"
              />
            </li>
            <li>
              <ShareButton
                url={entity.link}
                type="GooglePlus"
                countMessage="Compartidos"
                buttonMessage="COMPARTIR"
              />
            </li>
          </ul>
        </div>}
    </div>
  </div>;

Share.propTypes = {
  isOpen: PropTypes.bool,
  entity: PropTypes.shape({}),
  media: PropTypes.shape({}),
  goBack: PropTypes.func,
};

const mapStateToProps = state => ({
  isOpen: selectors.getShareModalOpen(state),
  entity: deps.selectorCreators.getWpTypeById(
    selectors.getShareModalWpType(state),
    selectors.getShareModalId(state)
  )(state),
  media: deps.selectors.getMediaEntities(state),
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(actions.closeShareModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Share);
