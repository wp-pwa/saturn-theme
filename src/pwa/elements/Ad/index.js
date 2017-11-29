import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Transition from 'react-transition-group/Transition';
import LoadUnload from '../LoadUnload';

class Ad extends Component {
  static propTypes = {
    siteId: PropTypes.number.isRequired,
    pageId: PropTypes.number.isRequired,
    formatId: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    target: PropTypes.string,
    slide: PropTypes.number,
    activeSlide: PropTypes.number.isRequired,
  };

  static defaultProps = {
    target: null,
    slide: null,
  };

  static create(args) {
    const sas = window && window.sas ? window.sas : (window.sas = {});

    const callParams = { ...args, async: true };
    const { tagId } = args;

    sas.cmd = sas.cmd || [];

    if (Ad.firstAd) {
      Ad.firstAd = false;
      sas.cmd.push(() => {
        sas.setup({ networkid: 2506, domain: '//www8.smartadserver.com', async: true });
      });
    }

    sas.cmd.push(() => {
      const containerExists = window.document.getElementById(tagId) !== null;
      if (containerExists) sas.call('iframe', callParams);
    });
  }

  static randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  static firstAd = true;

  render() {
    const { siteId, pageId, formatId, target, width, height, slide, activeSlide } = this.props;
    const tagId = `ad${formatId}${slide || ''}`;
    const exit = Ad.randomBetween(2000, 6000);

    return (
      <Container width={width} height={height}>
        <IconContainer>
          <IconText>ad</IconText>
        </IconContainer>
        <Transition
          in={slide === activeSlide || slide === null}
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
                  topOffset={-2000}
                  bottomOffset={-2000}
                  onEnter={() => {
                    setTimeout(() => {
                      Ad.create({ siteId, pageId, formatId, target, width, height, tagId });
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
  }
}

export default connect()(
  inject(({ connection }) => {
    const { id, type } = connection.selected;
    const list = connection.context.columns;

    return {
      target: connection.single[type] && connection.single[type][id].target,
      activeSlide: list.findIndex(column =>
        column.items.find(item => item.singleId === id || item.listId === id),
      ),
    };
  })(Ad),
);

const Container = styled.div`
  margin: 10px auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

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
