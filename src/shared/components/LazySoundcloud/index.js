import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import { Helmet } from 'react-helmet';
import LazyLoad from '@frontity/lazyload';

const LazySoundcloud = ({ width, height, track, color, attributes, isAmp }) => {
  if (isAmp) {
    return (
      <Fragment>
        <Helmet>
          <script
            async=""
            custom-element="amp-soundcloud"
            src="https://cdn.ampproject.org/v0/amp-soundcloud-0.1.js"
          />
        </Helmet>
        <Container styles={{ width, height }}>
          <amp-soundcloud
            height={height}
            layout="fixed-height"
            data-trackid={track}
            data-color={color}
          />
        </Container>
      </Fragment>
    );
  }

  return (
    <Container styles={{ width, height }}>
      <LazyLoad
        elementType="span"
        offsetVertical={2000}
        offsetHorizontal={-10}
        throttle={50}
      >
        <iframe title="Soundcloud" {...attributes} />
      </LazyLoad>
    </Container>
  );
};

LazySoundcloud.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  track: PropTypes.string,
  color: PropTypes.string,
  attributes: PropTypes.shape({}).isRequired,
  isAmp: PropTypes.bool.isRequired,
};

LazySoundcloud.defaultProps = {
  track: null,
  color: null,
};

export default inject(({ stores: { build } }) => ({
  isAmp: build.isAmp,
}))(LazySoundcloud);

const Container = styled.div`
  box-sizing: border-box;
  width: ${({ styles }) => styles.width};
  height: ${({ styles }) => styles.height};

  amp-soundcloud,
  iframe {
    border: none;
  }
`;
