import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { inject } from 'mobx-react';
import { Helmet } from 'react-helmet';
import LazyLoad from '@frontity/lazyload';

class LazyFacebook extends Component {
  static propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    attributes: PropTypes.shape({}).isRequired,
    isVideo: PropTypes.bool.isRequired,
    isAmp: PropTypes.bool.isRequired,
  };

  constructor() {
    super();

    this.ref = null;
    this.state = {
      loaded: false,
    };

    this.handleContentVisible = this.handleContentVisible.bind(this);
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return this.state.loaded !== nextState.loaded;
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isVideo && !prevProps.isAmp) {
      if (window.document.getElementById('lazy-facebook')) {
        if (window.FB) window.FB.XFBML.parse();
      } else {
        const script = window.document.createElement('script');
        script.id = 'lazy-facebook';
        script.src = '//connect.facebook.net/en_US/sdk.js';
        script.async = true;
        script.chartset = 'utf-8';
        window.fbAsyncInit = () => {
          window.FB.init({ version: 'v4.1' });
          window.FB.XFBML.parse();
        };

        window.document.body.appendChild(script);
      }
    }
  }

  handleContentVisible() {
    this.setState({
      loaded: true,
    });
  }

  render() {
    const { width, height, href, attributes, isVideo, isAmp } = this.props;
    if (isAmp) {
      return (
        <Fragment>
          <Helmet>
            <script
              async=""
              custom-element="amp-facebook"
              src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"
            />
          </Helmet>
          <AmpContainer>
            <amp-facebook
              layout="responsive"
              width={1}
              height={1}
              data-href="https://www.facebook.com/FolbapImagenes/videos/1634773086534518/"
              data-embed-as={isVideo ? 'video' : 'post'}
            />
          </AmpContainer>
        </Fragment>
      );
    }

    if (isVideo) {
      return (
        <VideoContainer styles={{ width, height }}>
          <LazyLoad
            elementType="span"
            offsetVertical={2000}
            offsetHorizontal={-10}
            throttle={50}
            onContentVisible={this.handleContentVisible}
          >
            <iframe title="Facebook" {...attributes} />
          </LazyLoad>
        </VideoContainer>
      );
    }

    return (
      <PostContainer
        innerRef={node => {
          this.ref = node;
        }}
      >
        <LazyLoad
          elementType="span"
          offsetVertical={2000}
          offsetHorizontal={-10}
          throttle={50}
          onContentVisible={this.handleContentVisible}
        >
          <InnerContainer className="fb-post" data-href={href} />
        </LazyLoad>
      </PostContainer>
    );
  }
}

export default inject(({ stores: { build } }) => ({
  isAmp: build.isAmp,
}))(LazyFacebook);

const AmpContainer = styled.span``;

const VideoContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ styles: { height } }) => height};
  margin: 15px 0;

  .LazyLoad {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;

    & > iframe {
      height: 100%;
      width: ${({ styles: { width } }) => width};
      flex-shrink: 0;
    }
  }
`;

const PostContainer = styled.span`
  display: block;
  width: 100%;
  height: auto;
  margin: 15px 0;

  .LazyLoad {
    width: 100%;
  }
`;

const InnerContainer = styled.span`
  display: flex !important;
  justify-content: center;
`;
