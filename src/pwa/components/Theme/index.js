import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import { Helmet } from 'react-helmet';
import { dep } from 'worona-deps';
import Head from '../../../shared/components/Theme/Head';
import Title from '../../../shared/components/Theme/Title';
import Menu from '../Menu';
import Contexts from '../Contexts';
import Share from '../Share';
import GdprStyles from '../Gdpr/Styles';
import { getThemeProps } from '../../../shared/helpers';
import '../../../shared/styles';

class Theme extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
    Sticky: PropTypes.shape({}),
  };

  static defaultProps = {
    Sticky: null,
  };

  constructor(props) {
    super(props);

    this.cdn = process.env.PROD ? 'cdn' : 'precdn';
    this.theme = getThemeProps(props.mainColor);
  }

  render() {
    const { Sticky } = this.props;

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
          {Sticky && <Sticky />}
          <GdprStyles />
        </Fragment>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  const doesStickyExists = dep('ads', 'selectors', 'doesStickyExist')(state) || false;

  return {
    mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state),
    isSsr: dep('build', 'selectors', 'getSsr')(state),
    Sticky: (doesStickyExists && dep('ads', 'components', 'Sticky')) || null,
  };
};

export default connect(mapStateToProps)(Theme);
