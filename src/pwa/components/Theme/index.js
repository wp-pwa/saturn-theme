import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { ThemeProvider } from 'emotion-theming';
import { Helmet } from 'react-helmet';
import { dep } from 'worona-deps';
import Menu from '../Menu';
import Contexts from '../Contexts';
import Share from '../Share';
import Cookies from '../Cookies';
import { getThemeProps } from '../../../shared/helpers';
import '../../../shared/styles';

class Theme extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    headContent: PropTypes.shape({}).isRequired
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
    const { title, headContent } = this.props;

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
          <Menu />
          <Contexts />
          <Share />
          <Cookies />
        </Fragment>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state),
  isSsr: dep('build', 'selectors', 'getSsr')(state)
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }) => ({
    title:
      (connection.selected.single && connection.selected.single.meta.title) ||
      connection.siteInfo.home.title,
    headContent: connection.siteInfo.headContent
  }))
)(Theme);
