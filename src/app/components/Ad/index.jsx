/* global window */
import React, { PropTypes } from 'react';
import LazyLoad from 'react-lazy-load';
import uniqid from 'uniqid';
import styled from 'styled-components';

const Ad = props => {
  const { siteId, pageId, formatId, target, width, height } = props;
  const tagId = `${formatId}_${uniqid.time()}`;

  return (
    <Container width={width} height={height}>
      <LazyLoad
        offsetHorizontal={0}
        offsetVertical={800}
        throttle={100}
        width={width}
        height={height}
        onContentVisible={() => {
          const sas = (window.sas = window.sas || {});
          sas.cmd = sas.cmd || [];
          sas.cmd.push(() =>
            sas.call('iframe', {
              siteId,
              pageId,
              formatId,
              target,
              width,
              height,
              tagId,
              async: true,
            })
          );
        }}
      >
        <div id={tagId} />
      </LazyLoad>
    </Container>
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

const Container = styled.div`
  margin: 20px 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  background-color: #f5f5f5;

  * {
    max-width: 100%;
  }

  iframe {
    background-color: #f5f5f5;
    max-width: 100%;
  }
`;
