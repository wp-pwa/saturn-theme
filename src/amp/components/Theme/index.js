import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';
import Head from '../../../shared/components/Theme/Head';
import Title from '../../../shared/components/Theme/Title';
import PostBar from '../PostBar';
import Menu from '../Menu';
import Post from '../Post';
import Footer from '../Footer';
import MyRFooter from '../../../shared/components/MyRFooter';
import ShareBar from '../ShareBar';
import { getThemeProps } from '../../../shared/helpers';
import GlobalStyles from '../../../shared/styles';

class Theme extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
    bar: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    page: PropTypes.number,
    columnId: PropTypes.string.isRequired,
    customFooterName: PropTypes.string,
  };

  static defaultProps = {
    page: null,
    customFooterName: null,
  };

  constructor(props) {
    super(props);

    this.cdn = process.env.PROD ? 'cdn' : 'precdn';

    this.theme = getThemeProps(props.mainColor);
  }

  render() {
    const { bar, type, page, columnId, customFooterName } = this.props;

    return (
      <ThemeProvider theme={this.theme}>
        <Fragment>
          <GlobalStyles />
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
          {bar === 'single' && <PostBar key="header-single" />}
          <Menu />
          {!page && !['page', 'media'].includes(type) && <Post />}
          {customFooterName === 'myr' ? (
            <MyRFooter key="footer" columnId={columnId} />
          ) : (
            <Footer key="footer" />
          )}
          {bar === 'single' && <ShareBar key="share-bar" />}
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default inject(({ stores: { connection, settings } }) => {
  const customFooter = settings.theme.customFooter || {};

  return {
    bar: connection.selectedContext.options.bar,
    type: connection.selectedItem.type,
    page: connection.selectedItem.page,
    columnId: connection.selectedColumn.mstId,
    mainColor: settings.theme.mainColor,
    customFooterName: customFooter.name,
  };
})(Theme);
