/* global sas */
import React, { PropTypes } from 'react';
// import { compose, lifecycle } from 'recompose';
import LazyLoad from 'react-lazy-load';

import styles from './styles.css';

class Ad extends React.Component {

  constructor(props) {
    super(props);
    this.loadAd = this.loadAd.bind(this);
  }

  shouldComponentUpdate() {
    return true;
  }

  loadAd() {
    console.log('VISIBLE');
    const { siteId, pageId, formatId, width, height, target } = this.props;
    sas.call('iframe', {
      siteId,
      pageId,
      formatId,
      width,
      height,
      target,
      async: true,
      inSequence: true,
    }, {
      beforeRender: (data) => {
        console.log('BEFORE RENDER', data);
        setTimeout(() => {
          console.log('ID REMOVED', data.formatId);
          // this.adDiv.id = '';
        });
      },
      onError: (data) => {
        console.log('ON ERROR', data);
      },
      onLoad: (data) => {
        console.log('ON LOAD', data);
        // this.adDiv.id = '';
      },
    });
  }

  render() {
    return (
      <div className={styles.ad}>
        <div
          style={{
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
            background: '#f5f5f5',
          }}
        >
          {this.props.inActivePost && (
            <LazyLoad
              offsetHorizontal={-50}
              offsetVertical={400}
              throttle={100}
              width={this.props.width}
              height={this.props.height}
              onContentVisible={this.loadAd}
            >
              <div id={`sas_${this.props.formatId}`} ref={adDiv => (this.adDiv = adDiv)} />
            </LazyLoad>
          )}
        </div>
      </div>
    );
  }
}

Ad.propTypes = {
  inActivePost: PropTypes.bool.isRequired,
  siteId: PropTypes.number.isRequired,
  pageId: PropTypes.number.isRequired,
  formatId: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  target: PropTypes.string,
};

export default Ad;

// export default compose(
//   lifecycle({
//   })
// )(Ad);
