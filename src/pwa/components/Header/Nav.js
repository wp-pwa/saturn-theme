import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import NavList from './NavList';

const Nav = ({ isPost }) =>
  isPost
    ? null
    : <Container className="nav">
        <NavList />
      </Container>;

Nav.propTypes = {
  isPost: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isPost: dep('router', 'selectors', 'getType')(state) === 'post'
});

export default connect(mapStateToProps)(Nav);

const Container = styled.div`
  height: ${({ theme }) => theme.navbarSize};
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.bgColor};
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
