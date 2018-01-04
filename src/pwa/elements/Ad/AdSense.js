import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const resolverMap = new Map();
const observer = new window.MutationObserver(([{ target }]) => {
  const { width, height, contentWindow } = target.querySelector('iframe');
  const { document, google_ad_width, google_ad_height } = contentWindow;
  if (width != google_ad_width || height != google_ad_height) // eslint-disable-line
    console.warn('Size is not the same!!!', target);

  const listener = () => {
    document.removeEventListener('DOMContentLoaded', listener);
    resolverMap.get(target)();
    resolverMap.delete(target);
  };
  document.addEventListener('DOMContentLoaded', listener);
});

let currentPush = Promise.resolve();

class AdSense extends PureComponent {
  static propTypes = {
    client: PropTypes.string.isRequired,
    slot: PropTypes.string.isRequired,
    slide: PropTypes.number.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    width: 300,
    height: 250
  };

  constructor(props) {
    super(props);

    this.deferPush = this.deferPush.bind(this);
    this.push = this.push.bind(this);
  }

  componentDidMount() {
    if (window) {
      this.push();
      observer.observe(this.node, { childList: true });
    }
  }

  deferPush() {
    return new Promise(resolve => {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        resolverMap.set(this.node, resolve);
      } catch (e) {
        console.warn(e);
        resolve();
      }
    });
  }

  push() {
    currentPush = currentPush.then(this.deferPush);
  }

  render() {
    const { client, slot, width, height, slide } = this.props;
    return (
      <ins
        id={`slot: ${slot}, slide: ${slide}`}
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
