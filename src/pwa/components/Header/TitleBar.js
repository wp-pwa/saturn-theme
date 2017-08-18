import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import Logo from './Logo';
import SliderPoints from './SliderPoints';
import MenuButton from './MenuButton';
import CloseButton from './CloseButton';

const TitleBar = ({ type }) =>
  <Container>
    <MenuButton />
    {type === 'post' ? <SliderPoints /> : <Logo />}
    {type === 'post' ? <CloseButton /> : null}
  </Container>;

TitleBar.propTypes = {
  type: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  type: dep('router', 'selectors', 'getType')(state),
});

export default connect(mapStateToProps)(TitleBar);

const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor};
`;
