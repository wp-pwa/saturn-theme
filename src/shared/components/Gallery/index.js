import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled from 'react-emotion';
import ItemList from './ItemList';
import GalleryWithLinks from './GalleryWithLinks';

const Gallery = ({ isAmp, useIds, mediaAttributes }) => {
  if (isAmp) {
    const items = mediaAttributes.map(({ src, alt }) => (
      <ImageContainer>
        <amp-img src={src} width="40vw" height="40vw" alt={alt} layout="fill" />
      </ImageContainer>
    ));
    return [
      <Helmet>
        <script
          async=""
          custom-element="amp-carousel"
          src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
        />
      </Helmet>,
      <Container>
        <amp-carousel height="40vw" layout="fixed-height" type="carousel">
          {items}
        </amp-carousel>
      </Container>,
    ];
  }

  return useIds ? (
    <GalleryWithLinks mediaIds={mediaAttributes.map(({ attachmentId }) => attachmentId)} />
  ) : (
    <ItemList mediaAttributes={mediaAttributes} />
  );
};

Gallery.propTypes = {
  isAmp: PropTypes.bool.isRequired,
  useIds: PropTypes.bool.isRequired,
  mediaAttributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  isAmp: state.build.amp,
});

export default connect(mapStateToProps)(Gallery);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 1.5vmin 0;
  margin-bottom: 30px;
  background: #0e0e0e;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 40vw;
  height: 40vw;

  img {
    object-fit: cover;
  }
`;
