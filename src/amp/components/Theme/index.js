import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { ThemeProvider } from 'emotion-theming';
import { Helmet } from 'react-helmet';
import { dep } from 'worona-deps';
import Head from '../../../shared/components/Theme/Head';
import Title from '../../../shared/components/Theme/Title';
import PostBar from '../PostBar';
import Menu from '../Menu';
import Post from '../Post';
import Footer from '../Footer';
import MyRFooter from '../../../shared/components/MyRFooter';
import Cookies from '../Cookies';
import ShareBar from '../ShareBar';
import { getThemeProps } from '../../../shared/helpers';
import '../../../shared/styles';

const siteIds = ['uTJtb3FaGNZcNiyCb', 'x27yj7ZTsPjEngPPy'];

class Theme extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
    bar: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    page: PropTypes.string,
    siteId: PropTypes.string.isRequired,
    cookiesAmp: PropTypes.bool,
  };

  static defaultProps = {
    cookiesAmp: false,
    page: null,
  };

  constructor(props) {
    super(props);

    this.cdn = process.env.PROD ? 'cdn' : 'precdn';

    this.theme = getThemeProps(props.mainColor);
  }

  render() {
    const { bar, type, page, siteId, cookiesAmp } = this.props;

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
          {bar === 'single' && <PostBar key="header-single" />}
          <Menu />
          {!page && !['page', 'media'].includes(type) && <Post />}
          {siteIds.includes(siteId) ? (
            <MyRFooter key="footer" siteId={siteId} />
          ) : (
            <Footer key="footer" />
          )}
          {bar === 'single' && <ShareBar key="share-bar" />}
          {cookiesAmp && <Cookies />}
        </Fragment>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  const cookies =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'cookies')(state) || {};

  return {
    siteId: state.build.siteId,
    mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state),
    cookiesAmp: cookies.amp,
  };
};

export default compose(
  connect(mapStateToProps),
  inject(({ connection }) => ({
    bar: connection.selectedContext.options.bar,
    type: connection.selectedItem.type,
    page: connection.selectedItem.page,
  })),
)(Theme);
