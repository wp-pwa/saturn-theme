import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuButton from '../Menu/MenuButton';
import SliderPoints from './SliderPoints';
import CloseButton from './CloseButton';
import { Container } from '../../../shared/styled/PostBar';

const PostBar = ({ isHidden, dark }) => (
  <Container isHidden={isHidden} dark={dark}>
    <MenuButton />
    <SliderPoints dark={dark} />
    <CloseButton />
  </Container>
);

PostBar.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  dark: PropTypes.bool,
};

PostBar.defaultProps = {
  dark: false,
};

const mapStateToProps = state => ({
  isHidden: state.theme.scroll.hiddenBars,
});

export default connect(mapStateToProps)(PostBar);
