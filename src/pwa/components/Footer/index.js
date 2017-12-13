import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import * as actions from '../../actions';

const Footer = ({ classicVersionRequested }) => (
  <Container>
    <Logo>
      <Title>powered by</Title>
      <img
        src="https://worona.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=100"
        width="100"
        height="17"
        srcSet="https://worona.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=100 1x, https://worona.sirv.com/assets/worona%20icons/worona-logo-color.png?scale.width=200 2x"
        alt="Logo de Worona"
      />
    </Logo>
    <Desktop onClick={classicVersionRequested}>Versión clásica</Desktop>
  </Container>
);

Footer.propTypes = {
  classicVersionRequested: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  classicVersionRequested: () => dispatch(actions.footer.classicVersionRequested()),
});

export default connect(null, mapDispatchToProps)(Footer);

const Container = styled.div`
  width: 100%;
  height: 140px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: #999;
  border-top: 1px solid #eee;
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
