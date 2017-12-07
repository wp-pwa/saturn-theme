import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
// import universal from 'react-universal-component';
import { Helmet } from 'react-helmet';
import { dep } from 'worona-deps';
// import Transition from 'react-transition-group/Transition';
// import Header from '../Header';
import Menu from '../Menu';
import Context from '../Context';
import Share from '../Share';
import Cookies from '../Cookies';
import { darkenColor, blackOrWhite } from '../../libs';
import '../styles';

// const DynamicList = universal(import('../List'));
// const DynamicPost = universal(import('../Post'));
// const DynamicPage = universal(import('../Page'));

class Theme extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // canonical: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.cdn = process.env.PROD ? 'cdn' : 'precdn';

    const linkColor = darkenColor(props.mainColor);

    this.theme = {
      color: blackOrWhite(props.mainColor),
      bgColor: props.mainColor,
      linkColor,
      titleSize: '56px',
      navbarSize: '30px',
      logoSize: '1.3em',
      menuPaddingLeft: '20px',
      shadowColor: '#999',
      postListLight: '#FFF',
      postListGrey: '#AAA',
      postListDark: '#333',
      shareSize: '44px',
      postLight: '#FFF',
      postGrey: '#AAA',
      postDark: '#333',
      shareBarHeight: '56px',
      shareBarButtonSize: '56px',
    };
  }

  render() {
    const { title, description } = this.props;
    return (
      <ThemeProvider theme={this.theme}>
        <div>
          <Helmet>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {/* {canonical && <link rel="canonical" href={canonical} />} */}
            <meta name="theme-color" content={this.theme.bgColor} />
            <meta name="apple-mobile-web-app-status-bar-style" content={this.theme.bgColor} />
            <meta name="msapplication-navbutton-color" content={this.theme.bgColor} />
            <meta name="mobile-web-app-capable" content="yes" />
            <script src="//ced.sascdn.com/tag/2506/smart.js" type="text/javascript" async />
          </Helmet>
          <Menu />
          <Context />
          <Share />
          <Cookies />
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state),
  // canonical: dep('connection', 'selectors', 'getCanonical')(state),
});

export default connect(mapStateToProps)(
  inject(stores => ({
    id: stores.connection.selected.id,
    type: stores.connection.selected.type,
    title: stores.connection.siteInfo.home.title,
    description: stores.connection.siteInfo.home.description,
  }))(Theme),
);
