import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled, { css } from 'styled-components';
import { Helmet } from 'react-helmet';

const FeaturedVideo = ({ src, isAmp }) => {
  const match =
    src.match(/\/embed\/([\d\w-]+)/) || src.match(/\/([\d\w-]+?)\?/);
  const videoId = match ? match[1] : null;
  return isAmp ? (
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
  );
};

FeaturedVideo.propTypes = {
  src: PropTypes.string,
  isAmp: PropTypes.bool.isRequired,
};

FeaturedVideo.defaultProps = {
  src: '',
};

export default inject(({ stores: { build } }) => ({
  isAmp: build.isAmp,
}))(FeaturedVideo);

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
