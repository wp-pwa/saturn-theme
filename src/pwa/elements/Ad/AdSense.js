import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AdSense extends PureComponent {
  static propTypes = {
    client: PropTypes.string.isRequired,
    slot: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    width: 300,
    height: 250,
  };

  static push() {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (e) {
      console.warn(e);
    }
  }

  componentDidMount() {
    if (window) AdSense.push();
  }

  componentWillUnmount() {
    // Removes Google's handler for this ad
    const iframe = this.node.querySelector('iframe');
    if (iframe) {
      const { google_iframe_oncopy: { handlers } } = window;
      delete handlers[iframe.id];
    }
  }

  render() {
    const { client, slot, width, height } = this.props;
    return (
      <ins
        ref={ins => {
          this.node = ins;
        }}
        className="adsbygoogle"
        data-ad-client={client}
        data-ad-slot={slot}
        style={{ display: 'inline-block', width: `${width}px`, height: `${height}px` }}
      />
    );
  }
}

export default AdSense;
