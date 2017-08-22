/* eslint-disable react/no-danger */
/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import dynamic from '@worona/next/dynamic';
import Head from '@worona/next/head';
import { dep } from 'worona-deps';
import mini from '../mini.css';
import { blackOrWhite } from '../../libs';
import Header from '../Header';
import Menu from '../Menu';
import Share from '../Share';
import Performance from '../../elements/Performance';
// import Cookies from '../Cookies';

injectGlobal`${mini}`; // eslint-disable-line

const DynamicList = dynamic(import('../List'));
const DynamicPost = dynamic(import('../Post'));
const DynamicPage = dynamic(import('../Page'));

const Theme = ({ mainColor, type }) => {
  const theme = {
    color: blackOrWhite(mainColor),
    bgColor: mainColor,
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
    shareBarButtonSize: '40px'
  };
  return (
    <Container>
      <Head>
        <script src="//ced.sascdn.com/tag/620/smart.js" type="text/javascript" async />
      </Head>
      <Performance />
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        <Menu />
      </ThemeProvider>
      {/* <ThemeProvider theme={theme}>
        {['latest', 'category', 'tag', 'author'].includes(type) && <DynamicList />}
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        {type === 'post' && <DynamicPost />}
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        {type === 'page' && <DynamicPage />}
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        <Share />
      </ThemeProvider> */}
    </Container>
  );
};

Theme.propTypes = {
  mainColor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state),
  type: dep('router', 'selectors', 'getType')(state)
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
