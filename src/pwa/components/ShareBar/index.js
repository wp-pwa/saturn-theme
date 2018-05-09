/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Shares from './Shares';
import NextButton from './NextButton';
import { Container } from '../../../shared/styled/ShareBar';

const ShareBar = ({ ready, hasNextColumn, shareBarHide, isBarHidden }) =>
    <Container isHidden={shareBarHide && isBarHidden}>
      <Shares />
      {hasNextColumn && <NextButton />}
    </Container>
);

ShareBar.propTypes = {
  hasNextColumn: PropTypes.bool.isRequired,
  shareBarHide: PropTypes.bool,
  isBarHidden: PropTypes.bool.isRequired,
};

ShareBar.defaultProps = {
  shareBarHide: false,
};

export default inject(({ connection, theme, settings }) => {
  const shareBar = settings.theme.shareBar || {};

  return {
    hasNextColumn: connection.selectedColumn.hasNextColumn,
    shareBarHide: shareBar.hide,
    isBarHidden: theme.scroll.isBarHidden,
  };
})(ShareBar);
