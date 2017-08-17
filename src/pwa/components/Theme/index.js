/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import dynamic from '@worona/next/dynamic';
import { dep } from 'worona-deps';
import mini from '../mini.css';
import { blackOrWhite } from '../../libs';
import Header from '../Header';
import Menu from '../Menu';
import Share from '../Share';
// import Cookies from '../Cookies';

injectGlobal`${mini}`; // eslint-disable-line

const DynamicHome = dynamic(import('../Home'));
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
    shareBarButtonSize: '40px',
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        <Menu />
        {['latest', 'category', 'tag', 'author'].includes(type) && <DynamicHome />}
        {type === 'post' && <DynamicPost />}
        {type === 'page' && <DynamicPage />}
        <Share />
        {/* <Cookies /> */}
        {/* <Overlay /> */}
      </Container>
    </ThemeProvider>
  );
};

Theme.propTypes = {
  mainColor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state),
  type: dep('router', 'selectors', 'getType')(state),
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

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 255, 0, 0.1);
//   overflow: scroll;
//   pointer-events: none;
// `;
