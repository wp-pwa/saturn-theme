import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import About from './About';
import Legal from './Legal';
import Powered from './Powered';

const client = 'ca-pub-2096136633140656';

const MyRFooter = ({ bar, isSelectedColumn, customFooterAds, Ad }) => {
  const [link, mediumRectangle, matchedContent] = customFooterAds;
  return (
    <Container bar={bar}>
      {link && (
        <Ad
          type="adsense"
          client={client}
          slot={link.slot}
          format={link.format}
          height={link.height}
          fallback={link.fallback}
          active={isSelectedColumn}
        />
      )}
      {mediumRectangle && (
        <Ad
          type="adsense"
          client={client}
          slot={mediumRectangle.slot}
          width={mediumRectangle.width}
          height={mediumRectangle.height}
          active={isSelectedColumn}
        />
      )}
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
  isSelectedColumn: PropTypes.bool.isRequired,
  customFooterAds: PropTypes.arrayOf(PropTypes.shape({})),
};

MyRFooter.defaultProps = {
  customFooterAds: [],
};

export default inject(
  ({ stores: { connection, settings }, components }, { columnId }) => ({
    Ad: components.ads.Ad,
    bar: connection.selectedContext.options.bar,
    isSelectedColumn: connection.selectedContext.getColumn(columnId).isSelected,
    customFooterAds: settings.theme.customFooter.ads,
  }),
)(MyRFooter);

const Container = styled.div`
  width: 100vw;
  box-sizing: border-box;
  padding-bottom: ${({ theme, bar }) =>
    bar === 'single' ? theme.heights.bar : ''};
`;
