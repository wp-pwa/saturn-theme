import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuButton from '../Menu/MenuButton';
import SliderPoints from './SliderPoints';
import CloseButton from './CloseButton';
import { Container } from '../../../shared/styled/HeaderSingle';

const HeaderSingle = ({ isHidden }) => (
  <Container isHidden={isHidden}>
    <MenuButton />
    <SliderPoints />
    <CloseButton />
  </Container>
);

HeaderSingle.propTypes = {
  isHidden: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isHidden: state.theme.scroll.hiddenBars
});

export default connect(mapStateToProps)(HeaderSingle);
