import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Lazy from '../LazyUnload';

import AdSense from './AdSense';
import SmartAd from './SmartAd';

const mapAds = {
  adsense: AdSense,
  smartads: SmartAd
};

const Ad = ({ type, width, height, active, isAmp, ...adProps }) => {
  const SelectedAd = mapAds[type];

  if (isAmp) {
    return (
      <Container styles={{ width, height: height + 1 }}>
        <IconContainer>
          <IconText>ad</IconText>
        </IconContainer>
        <SelectedAd width={width} height={height} isAmp={isAmp} {...adProps} />
      </Container>
    );
  }

  return (
    <Container styles={{ width, height: height + 1 }}>
      <IconContainer>
        <IconText>ad</IconText>
      </IconContainer>
      <StyledLazy
        active={active}
        height={height}
        width={width}
        offset={1200}
        debounce={false}
        minTime={2000}
        maxTime={3000}
      >
        <SelectedAd width={width} height={height} isAmp={isAmp} {...adProps} />
      </StyledLazy>
    </Container>
  );
};

Ad.propTypes = {
  type: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  active: PropTypes.bool.isRequired,
  isAmp: PropTypes.bool.isRequired
};

Ad.defaultProps = {
  type: 'smartads',
  width: 300,
  height: 250
};

const mapStateToProps = state => ({
  isAmp: state.build.amp
});

export default connect(mapStateToProps)(
  inject(({ connection }, { slide }) => {
    const { columns, column } = connection.context;
    return {
      active: columns.indexOf(column) === slide
    };
  })(Ad)
);

const Container = styled.div`
  margin: 10px auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: ${({ styles }) => styles.height}px;
  width: ${({ styles }) => styles.width}px;
  overflow: hidden;

  * {
    max-width: 100%;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconText = styled.span`
  margin: 0;
  padding: 3px 5px;
  font-size: 20px;
  line-height: 20px;
  color: #bdbdbd;
  text-transform: uppercase;
  border: 3px solid #bdbdbd;
  border-radius: 4px;
`;

const StyledLazy = styled(Lazy)`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  z-index: 1;
`;
