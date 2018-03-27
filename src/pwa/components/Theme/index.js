import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { ThemeProvider } from 'emotion-theming';
import { Helmet } from 'react-helmet';
import { dep } from 'worona-deps';
import universal from 'react-universal-component';
import Menu from '../Menu';
import Contexts from '../Contexts';
import Share from '../Share';
import * as selectors from '../../selectors';
import { getThemeProps } from '../../../shared/helpers';
import '../../../shared/styles';

const Cookies = universal(import('../Cookies'));
const Sticky = universal(import('../../../shared/components/Sticky'));

class Theme extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    headContent: PropTypes.shape({}).isRequired,
    sticky: PropTypes.bool.isRequired,
    cookiesPwa: PropTypes.bool,
  };

  static defaultProps = {
    cookiesPwa: false,
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
    const { title, headContent, sticky, cookiesPwa } = this.props;

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
          {sticky && <Sticky />}
          <Menu />
          <Contexts />
          <Share />
          {cookiesPwa && <Cookies />}
        </Fragment>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  const cookies =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'cookies')(state) || {};

  return {
    mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state),
    isSsr: dep('build', 'selectors', 'getSsr')(state),
    sticky: selectors.ads.doesStickyExist(state),
    cookiesPwa: cookies.pwa,
  };
};

export default compose(
  connect(mapStateToProps),
  inject(({ connection }) => ({
    title: connection.selectedItem.entity.headMeta.title,
    headContent: connection.siteInfo.headContent,
  })),
)(Theme);
