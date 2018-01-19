import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuButton from '../Menu/MenuButton';
import SliderPoints from './SliderPoints';
import CloseButton from './CloseButton';
import { Container } from '../../../shared/styled/HeaderSingle';

const HeaderSingle = ({ isHidden, dark }) => (
  <Container isHidden={isHidden} dark={dark}>
    <MenuButton />
    <SliderPoints dark={dark} />
    <CloseButton />
  </Container>
);

HeaderSingle.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  dark: PropTypes.bool,
};

HeaderSingle.defaultProps = {
  dark: false,
};

const mapStateToProps = state => ({
  isHidden: state.theme.scroll.hiddenBars,
});

export default connect(mapStateToProps)(HeaderSingle);
