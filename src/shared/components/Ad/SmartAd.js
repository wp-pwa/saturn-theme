import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Helmet } from 'react-helmet';

class SmartAd extends Component {
  static propTypes = {
    siteId: PropTypes.number.isRequired,
    pageId: PropTypes.number.isRequired,
    formatId: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    target: PropTypes.string,
    slide: PropTypes.number,
    isAmp: PropTypes.bool.isRequired,
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
    const { formatId, width, height, slide, isAmp, siteId, pageId, target } = this.props;

    if (isAmp) {
      return [
        <Helmet>
          <script
            async=""
            custom-element="amp-ad"
            src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
          />
        </Helmet>,
        <amp-ad
          type="smartadserver"
          data-site={siteId}
          data-page={pageId}
          data-format={formatId}
          data-domain="https://www8.smartadserver.com"
          data-target={target}
          width={width}
          height={height}
        />,
      ];
    }

    return [
      <Helmet>
        <script src="//ced.sascdn.com/tag/2506/smart.js" type="text/javascript" async />
      </Helmet>,
      <InnerContainer id={`ad${formatId}${slide || ''}`} width={width} height={height} />,
    ];
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
