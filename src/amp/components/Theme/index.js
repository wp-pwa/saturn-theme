import React, { Component } from 'react';
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
// import Share from '../Share';
import Cookies from '../Cookies';
import { getThemeProps } from '../../../shared/helpers';
import '../../../shared/styles';

class Theme extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    bar: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.cdn = process.env.PROD ? 'cdn' : 'precdn';

    this.theme = getThemeProps(props.mainColor);
  }

  render() {
    const { title, description, bar, type } = this.props;

    return (
      <ThemeProvider theme={this.theme}>
        <div>
          <Helmet>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            <meta name="theme-color" content={this.theme.colors.background} />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content={this.theme.colors.background}
            />
            <meta name="msapplication-navbutton-color" content={this.theme.colors.background} />
            <meta name="mobile-web-app-capable" content="yes" />
          </Helmet>
          {/* {bar === 'list' && <HeaderList key="header-list" />} */}
          {bar === 'single' && <HeaderSingle key="header-single" />}
          <Menu />
          {/* {['category', 'tag', 'author'].includes(type) && <List />} */}
          {type === 'post' && <Post />}
          {/* {type === 'page' ** <Page />} */}
          {/* <Share /> */}
          <Cookies />
          {/* {bar === 'single' && <ShareBar key="share-bar" />} */}
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
    description: connection.siteInfo.home.description,
    bar: connection.context.options.bar,
    type: connection.context.selected.type
  }))
)(Theme);
