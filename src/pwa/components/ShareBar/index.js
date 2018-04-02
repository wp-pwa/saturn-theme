/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import Shares from './Shares';
import NextButton from './NextButton';
import { Container } from '../../../shared/styled/ShareBar';

const ShareBar = ({ ready, hasNextColumn, hiddenBars, shareBarHide }) =>
  ready ? (
    <Container isHidden={hiddenBars && shareBarHide}>
      <Shares />
      {hasNextColumn && <NextButton />}
    </Container>
  ) : null;

ShareBar.propTypes = {
  ready: PropTypes.bool.isRequired,
  hasNextColumn: PropTypes.bool.isRequired,
  hiddenBars: PropTypes.bool.isRequired,
  shareBarHide: PropTypes.bool,
};

ShareBar.defaultProps = {
  shareBarHide: false,
};

const emptyObject = {};

const mapStateToProps = state => {
  const shareBar =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'shareBar')(state) || emptyObject;

  return {
    hiddenBars: state.theme.scroll.hiddenBars,
    shareBarHide: shareBar.hide,
  };
};

export default compose(
  connect(mapStateToProps),
  inject(({ connection }) => ({
    ready: connection.selectedItem.ready,
    hasNextColumn: connection.selectedColumn.hasNextColumn,
  })),
)(ShareBar);
