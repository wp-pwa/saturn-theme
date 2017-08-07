/* global window */
import React, { PropTypes } from 'react';
import uniqid from 'uniqid';
import CustomLazyLoad from './CustomLazyLoad';

import styles from './styles.css';

const create = ({ siteId, pageId, formatId, target, width, height, tagId }) => {
  const sas = (window.sas = window.sas || {});
  sas.cmd = sas.cmd || [];
  sas.cmd.push(() => sas.call('iframe', {
    siteId, pageId, formatId, target, width, height, tagId, async: true,
  }));
};

const remove = ({ tagId }) => {
  const ad = window.document.getElementById(tagId);
  while (ad.firstChild) {
    ad.removeChild(ad.firstChild);
  }
};

const Ad = (props) => {
  const { siteId, pageId, formatId, target, width, height } = props;
  const tagId = `${formatId}_${uniqid.time()}`;
  return (
    <div className={styles.ad}>
      <div
        className={styles.container}
      >
        <CustomLazyLoad
          width={width}
          height={height}
          topOffset={-100}
          bottomOffset={-100}
          onEnter={() => {
            console.log('ENTER');
            create({ siteId, pageId, formatId, target, width, height, tagId });
          }}
          onLeave={() => {
            console.log('LEAVE');
            remove({ tagId });
          }}
        >
          <div
            id={tagId}
            width={width}
            height={height}
            style={{ width: `${width}px`, height: `${height}px` }}
          />
        </CustomLazyLoad>
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
