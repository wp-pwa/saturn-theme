import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { ThemeProvider } from 'emotion-theming';
import { Helmet } from 'react-helmet';
import universal from 'react-universal-component';
import Head from '../../../shared/components/Theme/Head';
import Title from '../../../shared/components/Theme/Title';
import Menu from '../Menu';
import Contexts from '../Contexts';
import Share from '../Share';
import { getThemeProps } from '../../../shared/helpers';
import '../../../shared/styles';
import SlotInjector from '../../../shared/components/SlotInjector';

const Cookies = universal(import('../Cookies'));

class Theme extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
    cookiesPwa: PropTypes.bool,
  };

  static defaultProps = {
    cookiesPwa: false,
  };

  constructor(props) {
    super(props);

    this.cdn = process.env.PROD ? 'cdn' : 'precdn';
    this.theme = getThemeProps(props.mainColor);
  }

  render() {
    const { cookiesPwa } = this.props;

    return (
      <ThemeProvider theme={this.theme}>
        <Fragment>
          <Helmet>
            <meta name="theme-color" content={this.theme.colors.background} />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content={this.theme.colors.background}
            />
            <meta name="msapplication-navbutton-color" content={this.theme.colors.background} />
            <meta name="mobile-web-app-capable" content="yes" />
          </Helmet>
          <Head />
          <Title />
          <Menu />
          <Contexts />
          <Share />
          <SlotInjector theme={{ sticky: 'bottom' }} />
          {cookiesPwa && <Cookies />}
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default inject(({ stores: { settings, build } }) => {
  const cookies = settings.theme.cookies || {};
  return {
    mainColor: settings.theme.mainColor,
    cookiesPwa: cookies.pwa,
    isSsr: build.isSsr,
  };
})(Theme);
