/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import Shares from './Shares';
import ArrowButton from './ArrowButton';
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
  isFirstSlide,
  next,
  back,
}) =>
  ready ? (
    <Container isHidden={hiddenBars && shareBarHide}>
      {isFirstSlide ? null : <ArrowButton back={back} />}
      <Shares id={id} type={type} title={title} link={link} />
      {isLastSlide && !isListLoading ? null : (
        <ArrowButton next={next} isListLoading={isListLoading} />
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
  isFirstSlide: PropTypes.bool.isRequired,
  next: PropTypes.shape({}),
  back: PropTypes.shape({}),
  shareBarHide: PropTypes.bool,
};

ShareBar.defaultProps = {
  title: null,
  link: null,
  type: null,
  id: null,
  next: null,
  back: null,
  shareBarHide: false,
};

const mapStateToProps = state => {
  const shareBar =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'shareBar')(state) || {};

  return {
    hiddenBars: state.build.system.toLowerCase() !== 'ios' && state.theme.scroll.hiddenBars,
    shareBarHide: shareBar.hide,
  };
};

export default connect(mapStateToProps)(
  inject(({ connection }) => {
    const { id, type, route, fromList } = connection.selected;
    const { columns, column } = connection.context;
    const current = columns.indexOf(column);

    if (route === 'single' && connection.single[type][id]) {
      const { list } = connection;
      const currentList = fromList ? list[fromList.type][fromList.id] : list.latest.post;
      const { title } = connection.single[type][id];
      const link = connection.single[type][id]._link;
      let next;
      let back;

      if (current > 0) back = columns[current - 1].selected;
      if (current < columns.length - 1) next = columns[current + 1].selected;

      return {
        id,
        type,
        title,
        link,
        ready: true,
        isListLoading: currentList.fetching,
        isLastSlide: !next || !next.id,
        isFirstSlide: !back || !back.id,
        next,
        back,
      };
    }

    return {
      ready: false,
    };
  })(ShareBar),
);
