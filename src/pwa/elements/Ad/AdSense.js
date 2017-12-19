import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AdSense extends Component {
  static propTypes = {
    client: PropTypes.string.isRequired,
    slot: PropTypes.string.isRequired,
    format: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    format: 'auto',
    width: 300,
    height: 250,
  };

  componentDidMount() {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }

  render() {
    const { client, slot, format, width, height } = this.props;

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
