import React, { Component } from 'react';
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
    description: PropTypes.string,
    canonical: PropTypes.string.isRequired
  };

  static defaultProps = {
    description: null
  };

  constructor(props) {
    super(props);

    this.cdn = process.env.PROD ? 'cdn' : 'precdn';

    this.theme = getThemeProps(props.mainColor);
  }

  render() {
    const { title, description, canonical } = this.props;

    return (
      <ThemeProvider theme={this.theme}>
        <div>
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
          <Menu />
          <Contexts />
          <Share />
          <Cookies />
        </div>
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
    description: connection.selected.single
      ? connection.selected.single.meta.description
      : connection.siteInfo.home.description,
    canonical: connection.selected.single
      ? connection.selected.single.meta.canonical
      : connection.siteInfo.home.canonical
  }))
)(Theme);
