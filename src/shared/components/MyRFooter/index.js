import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import About from './About';
import Legal from './Legal';
import Powered from './Powered';

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
        height: 280,
      },
    },
    {
      slot: '5254564442',
      width: 320,
      height: 280,
    },
    {
      slot: '7796967304',
      height: 1200,
    },
  ],
  // wpdirecto.com
  x27yj7ZTsPjEngPPy: [
    {
      slot: '3932732157',
      height: 280,
      format: 'link',
      fallback: {
        client: 'ca-pub-2096136633140656',
        slot: '1825443566',
        width: 336,
        height: 280,
      },
    },
    {
      slot: '7844057003',
      width: 320,
      height: 280,
    },
    {
      slot: '7796967304',
      height: 1200,
    },
  ],
  // decoracion2.com
  CtCRo2fCnEja9Epub: [
    {
      format: 'link',
      slot: '7307919591',
      height: 250,
      fallback: {
        type: 'adsense',
        client: 'ca-pub-2096136633140656',
        slot: '2030539195',
        width: 300,
        height: 250,
      },
    },
    {
      slot: '2470007999',
      width: 320,
      height: 100,
    },
  ],
};

const MyRFooter = ({ bar, siteId, isSelectedColumn, Ad }) => {
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
        active={isSelectedColumn}
      />
      <Ad
        type="adsense"
        client={client}
        slot={mediumRectangle.slot}
        width={mediumRectangle.width}
        height={mediumRectangle.height}
        active={isSelectedColumn}
      />
      <About />
      <Legal />
      <Powered />
      {matchedContent && (
        <Ad
          type="adsense"
          client={client}
          slot={matchedContent.slot}
          width={matchedContent.width}
          height={matchedContent.height}
          active={isSelectedColumn}
        />
      )}
    </Container>
  );
};

MyRFooter.propTypes = {
  Ad: PropTypes.func.isRequired,
  bar: PropTypes.string.isRequired,
  siteId: PropTypes.string.isRequired,
  isSelectedColumn: PropTypes.bool.isRequired,
};

export default inject(
  ({ stores: { connection }, components }, { columnId }) => ({
    Ad: components.ads.Ad,
    bar: connection.selectedContext.options.bar,
    isSelectedColumn: connection.selectedContext.getColumn(columnId).isSelected,
  }),
)(MyRFooter);

const Container = styled.div`
  width: 100vw;
  box-sizing: border-box;
  padding-bottom: ${({ theme, bar }) =>
    bar === 'single' ? theme.heights.bar : ''};
`;
