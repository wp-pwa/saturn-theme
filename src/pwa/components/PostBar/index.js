import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import MenuButton from '../Menu/MenuButton';
import SliderPoints from './SliderPoints';
import CloseButton from './CloseButton';
import { Container } from '../../../shared/styled/PostBar';

const PostBar = ({ isHidden, postBarFlat, postBarHide }) => (
  <Container isHidden={isHidden && postBarHide} isFlat={postBarFlat}>
    <MenuButton />
    <SliderPoints isFlat={postBarFlat} />
    <CloseButton />
  </Container>
);

PostBar.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  postBarHide: PropTypes.bool,
  postBarFlat: PropTypes.bool,
};

PostBar.defaultProps = {
  postBarHide: true,
  postBarFlat: false,
};

const mapStateToProps = state => {
  const postBar =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'postBar')(state) || {};
  return {
    isHidden: state.theme.scroll.hiddenBars,
    postBarFlat: postBar.flat,
    postBarHide: postBar.hide,
  };
};

export default connect(mapStateToProps)(PostBar);
