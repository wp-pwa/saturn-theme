import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import LazyLoad from 'react-lazy-load';
import IconVideo from 'react-icons/lib/md/ondemand-video';
import styled from 'react-emotion';

const LazyYoutube = ({ children, width, height, isAmp, youtubeId }) => {
  if (isAmp) {
    return (
      youtubeId && [
        <Helmet>
          <script
            async=""
            custom-element="amp-youtube"
            src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
          />
        </Helmet>,
        <Container styles={{ height, width }}>
          <amp-youtube layout="fill" data-videoid={youtubeId} />
        </Container>
      ]
    );
  }

  return (
    <Container styles={{ height, width }}>
      <Icon>
        <IconVideo size={40} />
      </Icon>
      <StyledLazyLoad offsetVertical={500} throttle={50}>
        {children}
      </StyledLazyLoad>
    </Container>
  );
};

LazyYoutube.propTypes = {
  children: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  youtubeId: PropTypes.string.isRequired,
  isAmp: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAmp: state.build.amp
});

export default connect(mapStateToProps)(LazyYoutube);

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: ${({ styles }) => styles.width};
  height: ${({ styles }) => styles.height};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;

  amp-youtube,
  iframe {
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
