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

const ShareBar = ({ hasNextColumn, hiddenBars }) => (
  <Container isHidden={hiddenBars}>
    <Shares />
    {hasNextColumn && <NextButton />}
  </Container>
);

ShareBar.propTypes = {
  hasNextColumn: PropTypes.bool.isRequired,
  hiddenBars: PropTypes.bool,
};

ShareBar.defaultProps = {
  hiddenBars: null,
};

const mapStateToProps = state => {
  const shareBar =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'shareBar')(state) || {};

  if (shareBar.hide) {
    return {
      hiddenBars: state.theme.scroll.hiddenBars,
    };
  }

  return {};
};

export default compose(
  connect(mapStateToProps),
  inject(({ connection }) => ({
    hasNextColumn: connection.selectedColumn.hasNextColumn,
  })),
)(ShareBar);
