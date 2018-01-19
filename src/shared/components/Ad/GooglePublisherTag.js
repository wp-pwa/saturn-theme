import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import adler32 from 'adler-32';
import { Helmet } from 'react-helmet';

let firstAd = true;

class GooglePublisherTag extends PureComponent {
  static propTypes = {
    slot: PropTypes.string.isRequired,
    targetKey: PropTypes.string,
    targetValue: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isAmp: PropTypes.bool.isRequired
  };

  static defaultProps = {
    targetKey: null,
    targetValue: null,
    width: 300,
    height: 250
  };

  static push() {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (e) {
      // console.warn(e);
    }
  }

  constructor(props) {
    super(props);
    this.divId = `div-gpt-ad-${adler32.buf(props.slot)}-${0}`;
  }

  componentDidMount() {
    const { slot, width, height, targetKey, targetValue } = this.props;

    if (window) {
      if (firstAd) {
        firstAd = false;

        // Initialize GTP
        window.googletag = window.googletag || {};
        window.googletag.cmd = window.googletag.cmd || [];
      }

      window.googletag.cmd.push(() => {
        window.googletag
          .defineSlot(slot, [width, height], this.divId)
          .addService(window.googletag.pubads())
          .setTargeting(targetKey, targetValue);
        window.googletag.enableServices();
        window.googletag.display(this.divId);
      });
    }
  }

  render() {
    const { isAmp } = this.props;

    if (isAmp) {
      console.warn('GTP is currently not supported in AMP');
      return null;
    }

    return (
      <Fragment>
        <Helmet>
          <script src="//www.googletagservices.com/tag/js/gpt.js" async />
        </Helmet>
        <AdContainer id={this.divId} />
      </Fragment>
    );
  }
}

export default GooglePublisherTag;

const AdContainer = styled.div`
  display: inline-block;
  background: white;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
`;
