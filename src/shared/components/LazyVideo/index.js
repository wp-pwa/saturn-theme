/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-fastdom';
import IconVideo from 'react-icons/lib/md/ondemand-video';
import styled from 'react-emotion';
import { Helmet } from 'react-helmet';

const LazyVideo = ({ children, width, height, isAmp, videoProps }) => {
  const { autoPlay, loop, className, ...filteredProps } = videoProps;

  if (isAmp) {
    return [
      <Helmet>
        <script
          async=""
          custom-element="amp-video"
          src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
        />
      </Helmet>,
      <Container styles={{ height, width }}>
        <amp-video
          autoPlay={autoPlay ? '' : null}
          loop={loop ? '' : null}
          layout="fill"
          {...filteredProps}
        >
          {children}
        </amp-video>
      </Container>,
    ];
  }

  return (
    <Container styles={{ height, width }}>
      <Icon>
        <IconVideo size={40} />
      </Icon>
      <StyledLazyLoad offsetVertical={400} offsetHorizontal={-10} throttle={50}>
        <video autoPlay={!!autoPlay} loop={!!loop} {...filteredProps}>
          {children}
        </video>
      </StyledLazyLoad>
    </Container>
  );
};

LazyVideo.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.shape({}))])
    .isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  isAmp: PropTypes.bool.isRequired,
  videoProps: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  isAmp: state.build.amp,
});

export default connect(mapStateToProps)(LazyVideo);

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: ${({ styles }) => styles.width};
  height: ${({ styles }) => styles.height};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;

  video {
    width: ${({ styles }) => styles.width};
    height: ${({ styles }) => styles.height};
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  color: #bdbdbd;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLazyLoad = styled(LazyLoad)`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  background-color: transparent;
  color: transparent;
  border: none;
`;
