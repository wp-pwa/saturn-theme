import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import About from './About';
import Legal from './Legal';
import Powered from './Powered';
import Ad from '../../elements/Ad';

const MyRFooter = ({ bar }) => (
  <Container bar={bar}>
    <Ad
      type="adsense"
      client="ca-pub-2096136633140656"
      slot="7307919591"
      format="link"
      height={250}
    />
    <Ad
      type="adsense"
      client="ca-pub-2096136633140656"
      slot="2470007999"
      width={320}
      height={100}
    />
    <Ad
      type="adsense"
      client="ca-pub-2096136633140656"
      slot="2030539195"
      width={320}
      height={250}
    />
    <About />
    <Legal />
    <Powered />
    <Ad
      type="adsense"
      client="ca-pub-2096136633140656"
      slot="5423474394"
      width={320}
      height={600}
    />
  </Container>
);

MyRFooter.propTypes = {
  bar: PropTypes.string.isRequired
};

export default inject(({ connection }) => ({
  bar: connection.context.options.bar
}))(MyRFooter);

const Container = styled.div`
  width: 100vw;
  box-sizing: border-box;
  padding-bottom: ${({ theme, bar }) => (bar === 'single' ? theme.heights.bar : '')};
`;
