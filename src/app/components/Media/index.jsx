import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectors, selectorCreators } from '../../deps';

const Media = ({ isMediaReady, media, width, height }) => {
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
    <Div height={height} width={width}>
      <Img
        alt={alt}
        src={media.source_url}
        srcSet={srcSet}
        width={media.media_details.width}
        height={media.media_details.height}
      />
    </Div>
  );
};

const Div = styled.div`
  display: flex !important;
  flex-direction: column !important;
  width: ${props => props.width};
  height: ${props => props.height};
`;

const Img = styled.img`
  object-fit: cover;
  object-position: center;
  flex-grow: 1;
`;

Media.propTypes = {
  id: PropTypes.number.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  media: PropTypes.shape({}),
  isMediaReady: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  media: selectors.getMediaEntities(state)[ownProps.id],
  isMediaReady: selectorCreators.isMediaReady(ownProps.id)(state),
});

export default connect(mapStateToProps)(Media);
