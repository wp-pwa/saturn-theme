import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import { Helmet } from 'react-helmet';
import { dep } from 'worona-deps';
import Menu from '../Menu';
import Contexts from '../Contexts';
import Share from '../Share';
import Cookies from '../Cookies';
import { darkenColor, blackOrWhite } from '../../libs';
import '../../../shared/styles';

class Theme extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.cdn = process.env.PROD ? 'cdn' : 'precdn';

    this.theme = {
      color: blackOrWhite(props.mainColor),
      bgColor: props.mainColor,
      linkColor: darkenColor(props.mainColor),
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
      shareBarButtonSize: '56px'
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
            <meta name="theme-color" content={this.theme.bgColor} />
            <meta name="apple-mobile-web-app-status-bar-style" content={this.theme.bgColor} />
            <meta name="msapplication-navbutton-color" content={this.theme.bgColor} />
            <meta name="mobile-web-app-capable" content="yes" />
            <script src="//ced.sascdn.com/tag/2506/smart.js" type="text/javascript" async />
            <script src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" async />
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

export default connect(mapStateToProps)(
  inject(({ connection }) => {
    const { selected, siteInfo } = connection;
    return {
      id: selected.id,
      type: selected.type,
      title: (selected.single && selected.single.meta.title) || siteInfo.home.title,
      description: siteInfo.home.description
    };
  })(Theme)
);
