/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Shares from './Shares';
import NextButton from './NextButton';
import { Container } from '../../../shared/styled/ShareBar';

const ShareBar = ({ ready, hasNextColumn, shareBarHide, isBarHidden }) =>
  ready ? (
    <Container isHidden={shareBarHide && isBarHidden}>
      <Shares />
      {hasNextColumn && <NextButton />}
    </Container>
  ) : null;

ShareBar.propTypes = {
  ready: PropTypes.bool.isRequired,
  hasNextColumn: PropTypes.bool.isRequired,
  shareBarHide: PropTypes.bool,
  isBarHidden: PropTypes.bool.isRequired,
};

ShareBar.defaultProps = {
  shareBarHide: false,
};

export default inject(({ connection, theme, settings }) => {
  const shareBar = settings.getSetting('theme', 'shareBar') || {};

  return {
    ready: connection.selectedItem.ready,
    hasNextColumn: connection.selectedColumn.hasNextColumn,
    shareBarHide: shareBar.hide,
    isBarHidden: theme.scroll.isBarHidden,
  };
})(ShareBar);
