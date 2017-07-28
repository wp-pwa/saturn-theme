/* global window, location, sas */
import React, { PropTypes } from 'react';

// import iframeAd from './iframeAd';
import styles from './styles.css';

class Ad extends React.Component {
  constructor(props) {
    super(props);
    this.handleFrameTasks = this.handleFrameTasks.bind(this);
  }

  componentDidMount() {
    // const document = this.frame.contentWindow.document;
    const { siteId, pageId, formatId, target } = this.props;
    // document.open();
    // document.write(iframeAd({ siteId, pageId, formatId, target }));
    // document.close();
    // window.addEventListener('message', this.handleFrameTasks);
    sas.call('iframe', {
      siteId,
      pageId,
      formatId,
      target,
      async: true,
      width: 300,
      height: 600,
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleFrameTasks);
  }

  handleFrameTasks(event) {
    const { data, origin, source } = event;

    if (origin !== location.origin) {
      throw new Error(`Unexpected origin: ${origin}`);
    }

    const object = JSON.parse(data);
    const { width, height } = object;
    if (source === this.frame.contentWindow) {
      if (width) {
        this.frame.width = width;
        this.frame.style.width = `${width}px`;
      }
      if (height) {
        this.frame.height = height;
        this.frame.style.height = `${height}px`;
      }
    }
  }

  render() {
    return (
      <div className={styles.ad}>
        <div className={styles.placeholder}>
          <div className={styles.placeholderText}>
            {'AD'}
          </div>
        </div>
        <iframe
          className={styles.frame}
          src="about:blank"
          ref={frame => (this.frame = frame)}
          width="300"
        />
        <div id={`sas_${this.props.formatId}`} />
      </div>
    );
  }
}

Ad.propTypes = {
  siteId: PropTypes.number,
  pageId: PropTypes.number,
  formatId: PropTypes.number,
  target: PropTypes.string,
};

export default Ad;
