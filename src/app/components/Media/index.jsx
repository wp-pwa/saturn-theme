import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectors, selectorCreators } from '../../deps';

import styles from './styles.css';

const Media = ({ isMediaReady, media, className }) => {
  let alt;
  let images;
  let srcSet;

  if (isMediaReady) {
    alt = media.alt_text;
    images = media.media_details.sizes;

    // Build srcset string for <img />
    srcSet = Object.keys(images)
      .reduce((a, b) => {
        if (a.every(item => images[item].width !== images[b].width)) a.push(b);
        return a;
      }, [])
      .map(key => `${images[key].source_url} ${images[key].width}`)
      .reduce((total, current) => `${total}${current}w, `, '');
  }

  return (
    isMediaReady &&
    <div className={`${styles.media} ${className}`}>
      <img
        alt={alt}
        src={media.source_url}
        srcSet={srcSet}
        width={media.media_details.width}
        height={media.media_details.height}
      />
    </div>
  );
};

Media.propTypes = {
  id: PropTypes.number.isRequired,
  media: PropTypes.shape({}),
  isMediaReady: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  media: selectors.getMediaEntities(state)[ownProps.id],
  isMediaReady: selectorCreators.isMediaReady(ownProps.id)(state),
});

export default connect(mapStateToProps)(Media);
