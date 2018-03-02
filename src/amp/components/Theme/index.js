import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { ThemeProvider } from 'emotion-theming';
import { Helmet } from 'react-helmet';
import { dep } from 'worona-deps';
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
    title: PropTypes.string.isRequired,
    headContent: PropTypes.shape({}).isRequired,
    bar: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    siteId: PropTypes.string.isRequired,
  };

  static handleNode(node, index) {
    return <node.tagName key={index} {...node.attributes} />;
  }

  constructor(props) {
    super(props);

    this.cdn = process.env.PROD ? 'cdn' : 'precdn';

    this.theme = getThemeProps(props.mainColor);
  }

  render() {
    const { bar, type, siteId, title, headContent } = this.props;

    return (
      <ThemeProvider theme={this.theme}>
        <Fragment>
          <Helmet>
            <title>{title}</title>
            {headContent.map(Theme.handleNode)}
            <meta name="theme-color" content={this.theme.colors.background} />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content={this.theme.colors.background}
            />
            <meta name="msapplication-navbutton-color" content={this.theme.colors.background} />
            <meta name="mobile-web-app-capable" content="yes" />
          </Helmet>
          {bar === 'single' && <PostBar key="header-single" />}
          <Menu />
          {type === 'post' && <Post />}
          {siteIds.includes(siteId) ? (
            <MyRFooter key="footer" siteId={siteId} />
          ) : (
            <Footer key="footer" />
          )}
          {bar === 'single' && <ShareBar key="share-bar" />}
          <Cookies />
        </Fragment>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  siteId: state.build.siteId,
  mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state),
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }) => ({
    title:
      (connection.selected.single && connection.selected.single.meta.title) ||
      connection.siteInfo.home.title,
    headContent: connection.siteInfo.headContent,
    bar: connection.context.options.bar,
    type: connection.context.selected.type,
  })),
)(Theme);
