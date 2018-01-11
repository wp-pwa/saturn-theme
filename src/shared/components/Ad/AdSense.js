import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

class AdSense extends Component {
  static propTypes = {
    client: PropTypes.string.isRequired,
    slot: PropTypes.string.isRequired,
    format: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    isAmp: PropTypes.bool.isRequired
  };

  static defaultProps = {
    format: 'auto',
    width: 300,
    height: 250
  };

  componentDidMount() {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }

  render() {
    const { client, slot, format, width, height, isAmp } = this.props;

    if (isAmp) {
      return [
        <Helmet>
          <script
            async=""
            custom-element="amp-ad"
            src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
          />
        </Helmet>,
        <amp-ad
          type="adsense"
          data-ad-client={client}
          data-ad-slot={slot}
          width={width}
          height={height}
        />
      ];
    }

    return (
      <ins
        className="adsbygoogle"
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        style={{ display: 'block', width, height }}
      />
    );
  }
}

export default AdSense;
