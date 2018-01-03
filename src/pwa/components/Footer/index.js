/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import * as actions from '../../actions';

const Footer = ({ classicVersionRequested, bar }) => (
  <Container bar={bar}>
    <Logo>
      <Title>powered by</Title>
      <a href="https://worona.org" rel="noopener nofollow" target="_blank">
        <img
          src="https://worona-cdn.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=100"
          width="100"
          height="17"
          srcSet="https://worona-cdn.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=100 1x, https://worona-cdn.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=200 2x"
          alt="Logo de Worona"
        />
      </a>
    </Logo>
    <Desktop onClick={classicVersionRequested}>Versión clásica</Desktop>
  </Container>
);

Footer.propTypes = {
  classicVersionRequested: PropTypes.func.isRequired,
  bar: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({
  classicVersionRequested: () => dispatch(actions.footer.classicVersionRequested())
});

export default compose(
  connect(null, mapDispatchToProps),
  inject(({ connection }) => ({
    bar: connection.context.options.bar
  }))
)(Footer);

const Container = styled.div`
  width: 100%;
  height: ${({ theme, bar }) =>
    bar === 'single' ? `calc(140px + ${theme.shareBarHeight})` : '140px'};
  padding: 20px;
  padding-bottom: ${({ theme, bar }) =>
    bar === 'single' ? `calc(20px + ${theme.shareBarHeight})` : ''};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: #999;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

const Desktop = styled.a`
  font-size: 0.6rem;
  text-decoration: underline !important;
`;
