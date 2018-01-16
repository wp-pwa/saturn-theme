import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { ThemeProvider } from 'emotion-theming';
import { Helmet } from 'react-helmet';
import { dep } from 'worona-deps';
import HeaderSingle from '../HeaderSingle';
import Menu from '../Menu';
import Post from '../Post';
import Footer from '../Footer';
import Cookies from '../Cookies';
import ShareBar from '../ShareBar';
import { getThemeProps } from '../../../shared/helpers';
import '../../../shared/styles';

class Theme extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    canonical: PropTypes.string.isRequired,
    bar: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.cdn = process.env.PROD ? 'cdn' : 'precdn';

    this.theme = getThemeProps(props.mainColor);
  }

  render() {
    const { title, description, canonical, bar, type } = this.props;

    return (
      <ThemeProvider theme={this.theme}>
        <Fragment>
          <Helmet>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {canonical && <link rel="canonical" href={canonical} />}
            <meta name="theme-color" content={this.theme.colors.background} />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content={this.theme.colors.background}
            />
            <meta name="msapplication-navbutton-color" content={this.theme.colors.background} />
            <meta name="mobile-web-app-capable" content="yes" />
          </Helmet>
          {bar === 'single' && <HeaderSingle key="header-single" />}
          <Menu />
          {type === 'post' && <Post />}
          <Footer />
          {bar === 'single' && <ShareBar key="share-bar" />}
          <Cookies />
        </Fragment>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state)
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }) => ({
    title:
      (connection.selected.single && connection.selected.single.meta.title) ||
      connection.siteInfo.home.title,
    description: connection.siteInfo.home.description,
    canonical: connection.selected.single && connection.selected.single.meta.canonical,
    bar: connection.context.options.bar,
    type: connection.context.selected.type
  }))
)(Theme);
