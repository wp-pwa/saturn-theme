import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled, { css } from 'styled-components';
import { Helmet } from 'react-helmet';
import SharedCount from './SharedCount';
import ReadingTime from './ReadingTime';

const FeaturedVideo = ({
  type,
  id,
  src,
  sharedCountPosition,
  readingTimePosition,
  isAmp,
}) => {
  const match =
    src.match(/\/embed\/([\d\w-]+)/) || src.match(/\/([\d\w-]+?)\?/);
  const videoId = match ? match[1] : null;
  return (
    <Container>
      {isAmp ? (
        <Fragment>
          <Helmet>
            <script
              async=""
              custom-element="amp-youtube"
              src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
            />
          </Helmet>
          <AmpContainer>
            <amp-youtube layout="fill" data-videoid={videoId} />
          </AmpContainer>
        </Fragment>
      ) : (
        <Iframe title="featured-video" src={src} allowFullScreen="" />
      )}
      {(sharedCountPosition === 'featured-image' ||
        readingTimePosition === 'featured-image') && (
        <InnerContainer>
          {sharedCountPosition === 'featured-image' && (
            <SharedCount type={type} id={id} />
          )}
          {readingTimePosition === 'featured-image' && (
            <ReadingTime type={type} id={id} />
          )}
        </InnerContainer>
      )}
    </Container>
  );
};

FeaturedVideo.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  sharedCountPosition: PropTypes.string,
  readingTimePosition: PropTypes.string,
  src: PropTypes.string,
  isAmp: PropTypes.bool.isRequired,
};

FeaturedVideo.defaultProps = {
  sharedCountPosition: 'header',
  readingTimePosition: 'header',
  src: '',
};

export default inject(({ stores: { settings, build } }) => {
  const sharedCount = settings.theme.sharedCount || {};
  const readingTime = settings.theme.readingTime || {};

  return {
    isAmp: build.isAmp,
    sharedCountPosition: sharedCount.position,
    readingTimePosition: readingTime.position,
  };
})(FeaturedVideo);

const Container = styled.div`
  position: relative;
`;

const InnerContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.4);
  color: ${({ theme }) => theme.colors.white};
  height: 36px;
`;

const dimensions = css`
  height: ${(100 * 9) / 16}vw;
  max-height: 240px;
  width: 100vw;
`;

const AmpContainer = styled.div`
  ${dimensions} position: relative;
`;

const Iframe = styled.iframe`
  ${dimensions} border: none;
  margin: 0;
  padding: 0;
`;
