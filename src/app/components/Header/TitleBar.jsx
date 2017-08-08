import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectors } from '../../deps';
import Logo from './Logo';
import SliderPoints from './SliderPoints';
import MenuButton from './MenuButton';
import CloseButton from './CloseButton';

const TitleBar = ({ currentPost }) =>
  <Container>
    <MenuButton />
    {currentPost ? <SliderPoints /> : <Logo />}
    {!!currentPost && <CloseButton />}
  </Container>;

TitleBar.propTypes = {
  currentPost: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  currentPost: parseInt(selectors.getURLQueries(state).p, 10) || 0,
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
