/* eslint-disable react/no-danger */
import intersectionObserver from 'raw-loader!intersection-observer'; // eslint-disable-line
import vanillaLazyload from 'raw-loader!../../../../node_modules/vanilla-lazyload/dist/lazyload.min.js'; // eslint-disable-line

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { ThemeProvider } from 'emotion-theming';
import { Helmet } from 'react-helmet';
import { Fill } from 'react-slot-fill';
import Head from '../../../shared/components/Theme/Head';
import Title from '../../../shared/components/Theme/Title';
import Menu from '../Menu';
import Contexts from '../Contexts';
import Share from '../Share';
import GdprStyles from '../Gdpr/Styles';
import { getThemeProps } from '../../../shared/helpers';
import '../../../shared/styles';
import SlotInjector from '../../../shared/components/SlotInjector';
import ContentCarousel from '../ContentCarousel';

class Theme extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.cdn = process.env.PROD ? 'cdn' : 'precdn';
    this.theme = getThemeProps(props.mainColor);
  }

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <Fragment>
          <Helmet>
            <meta name="theme-color" content={this.theme.colors.background} />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content={this.theme.colors.background}
            />
            <meta
              name="msapplication-navbutton-color"
              content={this.theme.colors.background}
            />
            <meta name="mobile-web-app-capable" content="yes" />
          </Helmet>
          <Head />
          <Title />
          <Menu />
          <Contexts />
          <Share />
          <SlotInjector position="theme" />
          <GdprStyles />
          <Fill name="content-carousel">
            <ContentCarousel />
          </Fill>
          <script
            id="intersection-observer"
            dangerouslySetInnerHTML={{ __html: intersectionObserver }}
          />
          <script
            id="vanilla-lazyload"
            dangerouslySetInnerHTML={{ __html: vanillaLazyload }}
          />
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default inject(({ stores: { settings, build } }) => ({
  mainColor: settings.theme.mainColor,
  isSsr: build.isSsr,
}))(Theme);
