import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import About from './About';
import Legal from './Legal';
import Powered from './Powered';
import Ad from '../../../shared/components/Ad';

const client = 'ca-pub-2096136633140656';

const customAds = {
  // herencia.net
  uTJtb3FaGNZcNiyCb: [
    {
      slot: '2376107909',
      height: 280,
      format: 'link',
      fallback: {
        client: 'ca-pub-2096136633140656',
        slot: '2435107218',
        width: 336,
        height: 280
      }
    },
    {
      slot: '5254564442',
      width: 320,
      height: 280
    },
    {
      slot: '7796967304',
      height: 1200
    }
  ],
  // wpdirecto.com
  x27yj7ZTsPjEngPPy: [
    {
      slot: '3932732157',
      height: 280,
      format: 'link',
      fallback: {
        client: 'ca-pub-2096136633140656',
        slot: '4223294622',
        width: 336,
        height: 280
      }
    },
    {
      slot: '7844057003',
      width: 320,
      height: 280
    },
    {
      slot: '7796967304',
      height: 1200
    }
  ]
};

const MyRFooter = ({ bar, siteId, slide }) => {
  const [link, mediumRectangle, matchedContent] = customAds[siteId];
  return (
    <Container bar={bar}>
      <Ad
        type="adsense"
        client={client}
        slot={link.slot}
        format={link.format}
        height={link.height}
        fallback={link.fallback}
        slide={slide}
      />
      <Ad
        type="adsense"
        client={client}
        slot={mediumRectangle.slot}
        width={mediumRectangle.width}
        height={mediumRectangle.height}
        slide={slide}
      />
      <About />
      <Legal />
      <Powered />
      <Ad
        type="adsense"
        client={client}
        slot={matchedContent.slot}
        width={matchedContent.width}
        height={matchedContent.height}
        slide={slide}
      />
    </Container>
  );
};

MyRFooter.propTypes = {
  bar: PropTypes.string.isRequired,
  siteId: PropTypes.string.isRequired,
  slide: PropTypes.number.isRequired
};

export default inject(({ connection }) => ({
  bar: connection.context.options.bar
}))(MyRFooter);

const Container = styled.div`
  width: 100vw;
  box-sizing: border-box;
  padding-bottom: ${({ theme, bar }) => (bar === 'single' ? theme.heights.bar : '')};
`;
