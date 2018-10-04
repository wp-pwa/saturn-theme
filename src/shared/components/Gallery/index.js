import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { chunk } from 'lodash-es';
import LinkedItemList from './LinkedItemList';
import ItemList from './ItemList';
import Lazy from '../LazyAnimated';
import { media } from '../../contexts';
import Spinner from '../Spinner';

const lazyProps = {
  animate: Lazy.onMount,
  ignoreSsr: true,
  offsetVertical: 500,
  offsetHorizontal: -50,
  debounce: false,
  throttle: 300,
};

class Gallery extends Component {
  componentDidMount() {
    const { entities, requestMedia } = this.props;
    const notReadyIds = entities
      .filter(({ isReady }) => !isReady)
      .map(({ id }) => id);
    if (notReadyIds.length) requestMedia(notReadyIds);
  }

  render() {
    const { isAmp, mediaAttributes, splitAfter } = this.props;

    if (mediaAttributes.length === 0) return null;

    if (isAmp) {
      const items = mediaAttributes.map(({ src, alt }) => (
        <ImageContainer key={src}>
          <amp-img
            src={src}
            width="40vw"
            height="40vw"
            alt={alt}
            layout="fill"
          />
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
        <Container className="gallery">
          <amp-carousel height="40vw" layout="fixed-height" type="carousel">
            {items}
          </amp-carousel>
        </Container>,
      ];
    }

    if (mediaAttributes.every(({ id }) => id)) {
      const splitLimit = Math.min(splitAfter, 100);
      const mediaIds = mediaAttributes.map(({ id }) => id);

      return chunk(mediaIds, splitLimit).map(chunkIds => (
        <Container key={`gallery ${chunkIds.join('_')}`} className="gallery">
          <Lazy {...lazyProps} placeholder={<Spinner />}>
            <LinkedItemList mediaIds={chunkIds} context={media(mediaIds)} />
          </Lazy>
        </Container>
      ));
    }

    return (
      <Container className="gallery">
        <Lazy {...lazyProps} placeholder={<Spinner />}>
          <ItemList mediaAttributes={mediaAttributes} />
        </Lazy>
      </Container>
    );
  }
}

Gallery.propTypes = {
  isAmp: PropTypes.bool.isRequired,
  mediaAttributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  splitAfter: PropTypes.number,
  entities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  requestMedia: PropTypes.func.isRequired,
};

Gallery.defaultProps = {
  splitAfter: 25,
};

export default inject(
  ({ stores: { connection, build } }, { mediaAttributes }) => ({
    isAmp: build.isAmp,
    requestMedia: mediaIds =>
      connection.fetchCustomPage({
        name: `media_${mediaIds.join('_')}`,
        type: 'media',
        page: 1,
        params: {
          include: mediaIds.join(','),
          per_page: 100,
          _embed: true,
        },
      }),
    entities: mediaAttributes
      .filter(({ id }) => id)
      .map(({ id }) => connection.entity('media', id)),
  }),
)(Gallery);

const Container = styled.span`
  height: 250px;
  margin: 24px 0;
  padding: 0;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > div {
    height: 100%;
    width: 100%;
  }
`;

const ImageContainer = styled.span`
  display: block;
  position: relative;
  width: 40vw;
  height: 40vw;

  img {
    object-fit: cover;
  }
`;
