import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Helmet } from 'react-helmet';
import Lazy from '@frontity/lazyload';

class LazyFacebookVideo extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
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

  componentDidUpdate() {
    if (window.FB) {
      window.FB.XFBML.parse();
    } else if (!window.document.getElementById('lazy-facebook-video')) {
      const script = window.document.createElement('script');
      script.id = 'lazy-facebook-video';
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.5';
      script.async = true;
      script.defer = true;
      script.charset = 'utf-8';
      script.onload = () => {
        window.FB.XFBML.parse();
      };

      window.document.body.appendChild(script);
    }
  }

  handleContentVisible() {
    this.setState({
      loaded: true,
    });
  }

  render() {
    const { children, isAmp, href } = this.props;

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
          <amp-facebook
            layout="responsive"
            // width={width}
            // height={height}
            data-href={href}
            data-embed-as="video"
          />
        </Fragment>
      );
    }

    return (
      <StyledLazy
        offsetVertical={2000}
        offsetHorizontal={-10}
        throttle={50}
        onContentVisible={this.handleContentVisible}
      >
        <div className="fb-video">{children}</div>
      </StyledLazy>
    );
  }
}

const mapStateToProps = state => ({
  isAmp: state.build.amp,
});

export default connect(mapStateToProps)(LazyFacebookVideo);

const StyledLazy = styled(Lazy)`
  width: 100vw;
  min-height: 200px;
`;
