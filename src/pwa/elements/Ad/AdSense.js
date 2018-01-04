import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// const cbk = mutationsList => {
//   Array.from(mutationsList)
//     .filter(m => m.type === 'childList')
//     .forEach(({ target }) => {
//       console.log(`Mutation ${target.id}`);
//       const { width, height, contentWindow, contentDocument } = target.querySelector('iframe');
//       const { google_ad_width, google_ad_height } = contentWindow;
//       // debugger
//       setTimeout(() => {debugger}, 100);
//       contentWindow.document.addEventListener('DOMContentLoaded', e => {
//         debugger;
//         console.log('DOMContentLoaded', e);
//       });
//       if (width != google_ad_width || height != google_ad_height) {
//         console.warn('Size is not the same!!!');
//       }
//       console.log(`WIDTH  - frame: ${width}, inside: ${google_ad_width}`);
//       console.log(`HEIGHT - frame: ${height}, inside: ${google_ad_height}`);
//     });
// };
//
// const childChanges = { childList: true };
//
// const observer = new window.MutationObserver(cbk);

// TRICKY PART
// let currentPush = Promise.resolve();
// window.pushDelay = 500; // millis
// const delayPush = () =>
//   new Promise(resolve => {
//     console.log('PUSH');
//     try {
//       window.adsbygoogle = window.adsbygoogle || [];
//       window.adsbygoogle.push({});
//     } catch (e) {
//       console.warn(e);
//     } finally {
//       setTimeout(() => resolve(), window.pushDelay);
//     }
//   });
// const awesomePush = () => {
//   currentPush = currentPush.then(delayPush);
// };

class AdSense extends PureComponent {
  static propTypes = {
    client: PropTypes.string.isRequired,
    slot: PropTypes.string.isRequired,
    format: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    format: '',
    width: 300,
    height: 250,
  };

  static currentPush = Promise.resolve();

  constructor(props) {
    super(props);

    this.deferPush = this.deferPush.bind(this);
    this.push = this.push.bind(this);
  }

  componentDidMount() {
    if (window) {
      // observer.observe(this.node, childChanges);
      // awesomePush();
      this.push();
    }
  }

  deferPush() {
    return new Promise(resolve => {
      console.log('PUSH');
      let obs; // observer
      debugger;
      const cb = ([{ target }]) => {
        const { contentWindow } = target.querySelector('iframe');
        const listener = () => {
          console.log(`DOMContentLoaded ${target.id}`);
          // contentWindow.document.removeEventListener('DOMContentLoaded', listener)
          // obs.disconnect();
          resolve();
        }
        contentWindow.document.addEventListener('DOMContentLoaded', listener);

      };
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        obs = new window.MutationObserver(cb);
        obs.observe(this.node, { childList: true });
      } catch (e) {
        console.warn(e);
        resolve();
      }
    });
  }

  push() {
    AdSense.currentPush = AdSense.currentPush.then(this.deferPush);
  }

  render() {
    const { client, slot, format, width, height, slide } = this.props;
    console.log('rendering ad', { slot, slide });
    return (
      <ins
        id={`slot: ${slot}, slide: ${slide}`}
        ref={ins => {
          this.node = ins;
        }}
        className="adsbygoogle"
        data-ad-client={client}
        data-ad-slot={slot}
        // data-ad-format={format}
        style={{ display: 'inline-block', width: `${width}px`, height: `${height}px` }}
      />
    );
  }
}

export default AdSense;
