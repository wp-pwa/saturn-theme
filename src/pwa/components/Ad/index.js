/* global window */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';

import LoadUnload from '../../elements/LoadUnload';

const create = args => {
  const sas = typeof window !== 'undefined' && window.sas ? window.sas : {};
  const { tagId } = args;
  sas.cmd = sas.cmd || [];
  sas.cmd.push(() => {
    if (window.document.getElementById(tagId)) {
      sas.call('iframe', {
        ...args,
        async: true,
      });
    }
  });
};

const randomBetween = (min, max) => (Math.random() * (max - min)) + min;

const Ad = ({ siteId, pageId, formatId, target, width, height, slide, activeSlide }) => {
  const tagId = `${formatId}_${uniqid.time()}`;
  const exit = randomBetween(2000, 6000);

  return (
    <Container width={width} height={height}>
      <IconContainer>
        <IconText>
          {'ad'}
        </IconText>
      </IconContainer>
      <Transition
        in={slide === activeSlide || slide === undefined}
        timeout={{ exit }}
        unmountOnExit
        enter={false}
      >
        {status => {
          if (status === 'entered' || status === 'exiting') {
            return (
              <StyledLoadUnload
                once
                width={width}
                height={height}
                topOffset={-600}
                bottomOffset={-600}
                onEnter={() => {
                  setTimeout(() => {
                    create({ siteId, pageId, formatId, target, width, height, tagId });
                  });
                }}
              >
                <InnerContainer id={tagId} width={width} height={height} />
              </StyledLoadUnload>
            );
          }
          return null;
        }}
      </Transition>
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
  slide: PropTypes.number,
  activeSlide: PropTypes.number,
};

const mapStateToProps = state => ({
  activeSlide: state.theme.postSlider.final.activeSlide,
});

export default connect(mapStateToProps)(Ad);

const Container = styled.div`
  margin: 30px auto;
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
  color: #fff;
  text-transform: uppercase;
  border: 3px solid #fff;
  border-radius: 10px;
`;

const StyledLoadUnload = styled(LoadUnload)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;

  iframe {
    max-width: 100%;
  }
`;
