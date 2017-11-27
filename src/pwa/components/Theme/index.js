/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';
import universal from 'react-universal-component';
import { Helmet } from 'react-helmet';
import { dep } from 'worona-deps';
import Transition from 'react-transition-group/Transition';
import '../styles';
import { blackOrWhite } from '../../libs';
import Header from '../Header';
import Menu from '../Menu';
import Share from '../Share';
import Cookies from '../Cookies';

const DynamicList = universal(import('../List'));
// const DynamicPost = universal(import('../Post'));
// const DynamicPage = universal(import('../Page'));

class Theme extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // canonical: PropTypes.string.isRequired,
  };

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
    // const { title, description, canonical, type } = this.props;
    const { type } = this.props;

    return (
      <ThemeProvider theme={this.theme}>
        <Container>
          <Helmet>
            {/* {title && <title>{title}</title>} */}
            {/* {description && <meta name="description" content={description} />} */}
            {/* {canonical && <link rel="canonical" href={canonical} />} */}
            <meta name="theme-color" content={this.theme.bgColor} />
            <meta name="apple-mobile-web-app-status-bar-style" content={this.theme.bgColor} />
            <meta name="msapplication-navbutton-color" content={this.theme.bgColor} />
            <meta name="mobile-web-app-capable" content="yes" />
            <script src="//ced.sascdn.com/tag/2506/smart.js" type="text/javascript" async />
          </Helmet>
          {type !== 'post' && <Header />}
          <Menu />
          <Transition
            in={['latest', 'category', 'tag', 'author'].includes(type)}
            timeout={500}
            onEnter={() => window.scrollX}
            mountOnEnter
            unmountOnExit
          >
            {status => <DynamicList status={status} />}
          </Transition>
          {/* {type === 'page' && <DynamicPage />} */}
          {/* <Transition
            in={type === 'post'}
            timeout={500}
            onEnter={() => window.scrollX}
            mountOnEnter
            unmountOnExit
          >
            {status => <DynamicPost status={status} />}
          </Transition> */}
          <Share />
          <Cookies />
        </Container>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state),
  // title: dep('connection', 'selectors', 'getTitle')(state),
  // description: dep('connection', 'selectors', 'getDescription')(state),
  // canonical: dep('connection', 'selectors', 'getCanonical')(state),
});

export default connect(mapStateToProps)(
  inject(stores => ({
    type: stores.connection.selected.type,
    id: stores.connection.selected.id,
  }))(Theme),
);

const Container = styled.div`
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
  *:focus,
  *:hover {
    opacity: 1;
  }
`;
