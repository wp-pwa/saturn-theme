/* eslint-disable react/no-danger */
/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import dynamic from '@worona/next/dynamic';
import Head from '@worona/next/head';
import { dep } from 'worona-deps';
import Transition from 'react-transition-group/Transition';
import mini from '../mini.css';
import { blackOrWhite } from '../../libs';
import Header from '../Header';
import Menu from '../Menu';
import Share from '../Share';
import ShareBar from '../ShareBar';
import Cookies from '../Cookies';
// import Performance from '../../elements/Performance';
// import whyDidYouUpdate from 'why-did-you-update';

// eslint-disable-next-line
injectGlobal`
  ${mini}

  body {
    background-color: #FFF;
  }
`;

// if (process.env.NODE_ENV !== 'production') {
//   // eslint-disable-next-line no-unused-vars,react/no-deprecated
//   let createClass = React.createClass;
//   Object.defineProperty(React, 'createClass', {
//     set: nextCreateClass => {
//       createClass = nextCreateClass;
//     }
//   });
//   // eslint-disable-next-line global-require
//   whyDidYouUpdate(React);
// }

const loading = () => null;
const DynamicList = dynamic(import('../List'), { loading });
const DynamicPost = dynamic(import('../Post'), { loading });
const DynamicPage = dynamic(import('../Page'), { loading });

class Theme extends Component {
  constructor(props) {
    super(props);

    this.cdn = process.env.PROD ? 'cdn' : 'precdn';

    this.theme = {
      color: blackOrWhite(props.mainColor),
      bgColor: props.mainColor,
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
      shareBarButtonSize: '40px',
    };
  }

  render() {
    const { type, siteId } = this.props;

    return (
      <ThemeProvider theme={this.theme}>
        <Container>
          <Head>
            <meta name="theme-color" content={this.theme.bgColor} />
            <meta name="apple-mobile-web-app-status-bar-style" content={this.theme.bgColor} />
            <meta name="msapplication-navbutton-color" content={this.theme.bgColor} />
            <meta name="mobile-web-app-capable" content="yes" />
            <link rel="manifest" href={`https://${this.cdn}.worona.io/api/v1/manifest/${siteId}`} />
            <script src="//ced.sascdn.com/tag/620/smart.js" type="text/javascript" async />
          </Head>
          <Header />
          <Menu />
          {['latest', 'category', 'tag', 'author'].includes(type) && <DynamicList />}
          {type === 'page' && <DynamicPage />}
          <Transition
            in={type === 'post'}
            timeout={1000}
            mountOnEnter
            unmountOnExit
          >
            {status => <DynamicPost status={status} />}
          </Transition>
          <Share />
          {type === 'post' && <ShareBar />}
          <Cookies />
        </Container>
      </ThemeProvider>
    );
  }
}

Theme.propTypes = {
  mainColor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  siteId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state),
  type: dep('router', 'selectors', 'getType')(state),
  siteId: dep('settings', 'selectors', 'getSiteId')(state),
});

export default connect(mapStateToProps)(Theme);

const Container = styled.div`
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }

  *:focus,
  *:hover {
    opacity: 1;
  }
`;
