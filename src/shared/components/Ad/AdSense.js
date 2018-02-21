/* eslint-disable react/no-danger */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Helmet } from 'react-helmet';

const linkCount = {};

class AdSense extends Component {
  static propTypes = {
    client: PropTypes.string.isRequired,
    slot: PropTypes.string.isRequired,
    format: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isAmp: PropTypes.bool.isRequired,
    showImmediatly: PropTypes.bool,
    fallback: PropTypes.shape(AdSense.propTypes),
  };

  static defaultProps = {
    format: null,
    width: 300,
    height: 250,
    fallback: null,
    showImmediatly: false,
  };

  static push({ client, slot, format }) {
    try {
      console.log('push');
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});

      if (format === 'link') {
        const slotId = `${client}/${slot}`;
        linkCount[slotId] = (linkCount[slotId] || 0) + 1;
      }
    } catch (e) {
      // console.warn(e);
    }
  }

  componentWillMount() {
    const { showImmediatly } = this.props;
    console.log(showImmediatly);

    const domElement =
      typeof window !== 'undefined' && showImmediatly
        ? window.document.querySelector('.adsbygoogle[data-first-ads=true]')
        : null;

    if (domElement) {
      this.innerHTML = domElement.innerHTML;
      domElement.dataset.firstAds = false;
    }
  }

  componentDidMount() {
    const { showImmediatly } = this.props;
    if (window && !showImmediatly) AdSense.push(this.props);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    // Removes Google's handler for this ad
    const iframe = this.node.querySelector('iframe');
    if (iframe) {
      const { google_iframe_oncopy: { handlers } } = window;
      delete handlers[iframe.id];
    }
  }

  render() {
    const { isAmp, fallback, showImmediatly } = this.props;
    let { client, slot, width, height, format } = this.props;

    // Uses fallback if limit was reached
    const slotId = `${client}/${slot}`;
    if (format === 'link' && linkCount[slotId] >= 3 && fallback) {
      ({ client, slot, width, height, format } = fallback);
    }

    if (isAmp) {
      return [
        <Helmet>
          <script
            async=""
            custom-element="amp-ad"
            src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
          />
        </Helmet>,
        <amp-ad type="adsense" data-ad-client={client} data-ad-slot={slot} layout="fill" />,
      ];
    }

    return (
      <Fragment>
        <Helmet>
          <script src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" async />
        </Helmet>
        <Container width={width} height={height}>
          <ins
            ref={ins => {
              this.node = ins;
            }}
            className="adsbygoogle"
            data-first-ads={showImmediatly}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            width={width}
            height={height}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: this.innerHTML,
            }}
          />
        </Container>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log('yeah');
              (window.adsbygoogle = window.adsbygoogle || []).push({});
          `,
          }}
        />
      </Fragment>
    );
  }
}

export default AdSense;

const Container = styled.div`
  display: block;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  margin: 0 auto;
  & > ins {
    display: block;
    background-color: ${({ theme }) => theme.colors.white};
    width: 100%;
    height: 100%;
  }
`;
