/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import Shares from './Shares';
import NextButton from './NextButton';
import { Container } from '../../../shared/styled/ShareBar';

const ShareBar = ({
  id,
  type,
  hiddenBars,
  shareBarHide,
  title,
  link,
  ready,
  isListLoading,
  isLastSlide,
  next,
}) =>
  ready ? (
    <Container isHidden={hiddenBars && shareBarHide}>
      <Shares id={id} type={type} title={title} link={link} />
      {isLastSlide && !isListLoading ? null : (
        <NextButton next={next} isListLoading={isListLoading} />
      )}
    </Container>
  ) : null;

ShareBar.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hiddenBars: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  isListLoading: PropTypes.bool.isRequired,
  isLastSlide: PropTypes.bool.isRequired,
  next: PropTypes.shape({}),
  shareBarHide: PropTypes.bool,
};

ShareBar.defaultProps = {
  title: null,
  link: null,
  type: null,
  id: null,
  next: null,
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

export default connect(mapStateToProps)(
  inject(({ connection }) => {
    const { id, type, isSingle, fromList } = connection.selectedItem;

    if (isSingle && connection.selectedColumn.nextColumn) {
      return {
        id,
        type,
        title: connection.entity(type, id).title,
        link: connection.entity(type, id).link,
        ready: connection.entity(fromList.type, fromList.id).ready,
        isListLoading: connection.entity(fromList.type, fromList.id).fetching,
        isLastSlide: !connection.selectedColumn.nextColumn,
        next: connection.selectedColumn.nextColumn.selectedItem,
      };
    }

    return {
      ready: false,
    };
  })(ShareBar),
);
