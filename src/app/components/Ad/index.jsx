/* global sas */
import React, { PropTypes } from 'react';
import LazyLoad from 'react-lazy-load';
import uniqid from 'uniqid';

import styles from './styles.css';

const Ad = (props) => {
  const { siteId, pageId, formatId, target, width, height } = props;
  const tagId = `${formatId}_${uniqid.time()}`;
  return (
    <div className={styles.ad}>
      <div
        className={styles.container}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <LazyLoad
          offsetHorizontal={0}
          offsetVertical={400}
          throttle={100}
          width={width}
          height={height}
          onContentVisible={() => {
            sas.call('iframe', {
              siteId, pageId, formatId, target, width, height, tagId, async: true,
            });
          }}
        >
          <div id={tagId} />
        </LazyLoad>
      </div>
    </div>
  );
};

Ad.propTypes = {
  siteId: PropTypes.number.isRequired,
  pageId: PropTypes.number.isRequired,
  formatId: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  target: PropTypes.string,
};

export default Ad;
