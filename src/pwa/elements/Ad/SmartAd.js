import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

class SmartAd extends Component {
  static propTypes = {
    siteId: PropTypes.number.isRequired,
    pageId: PropTypes.number.isRequired,
    formatId: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    target: PropTypes.string,
    slide: PropTypes.number,
  };

  static defaultProps = {
    target: null,
    slide: null,
  };

  static firstAd = true;

  componentDidMount() {
    const { siteId, pageId, formatId, target, width, height, slide } = this.props;
    const tagId = `ad${formatId}${slide || ''}`;
    const callParams = { siteId, pageId, formatId, target, width, height, tagId, async: true };

    const sas = window && window.sas ? window.sas : (window.sas = {});
    sas.cmd = sas.cmd || [];

    if (SmartAd.firstAd) {
      SmartAd.firstAd = false;
      sas.cmd.push(() => {
        sas.setup({ networkid: 2506, domain: '//www8.smartadserver.com', async: true });
      });
    }

    sas.cmd.push(() => {
      const containerExists = window.document.getElementById(tagId) !== null;
      if (containerExists) sas.call('iframe', callParams);
    });
  }


  render() {
    const { formatId, width, height, slide } = this.props;
    return <InnerContainer id={`ad${formatId}${slide || ''}`} width={width} height={height} />;
  }
}

export default SmartAd;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;

  iframe {
    max-width: 100%;
  }
`;
