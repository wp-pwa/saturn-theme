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
    const { id, type, route, column, fromList } = connection.selected;
    const next = column.next && column.next.selected;

    if (route === 'single' && connection.single[type][id]) {
      const { list } = connection;
      const currentList = fromList ? list[fromList.type][fromList.id] : list.latest.post;
      const { title } = connection.single[type][id];
      const link = connection.single[type][id]._link;
      return {
        id,
        type,
        title,
        link,
        ready: true,
        isListLoading: currentList.fetching,
        isLastSlide: !next || !next.id,
        next,
      };
    }

    return {
      ready: false,
    };
  })(ShareBar),
);
