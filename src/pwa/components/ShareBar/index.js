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
  hideShareBar,
  title,
  link,
  ready,
  isListLoading,
  isLastSlide,
  next,
}) =>
  ready ? (
    <Container isHidden={hiddenBars && hideShareBar}>
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
  hideShareBar: PropTypes.bool,
};

ShareBar.defaultProps = {
  title: null,
  link: null,
  type: null,
  id: null,
  next: null,
  hideShareBar: true,
};

const mapStateToProps = state => {
  const shareBar =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'shareBar')(state) || {};

  return {
    hiddenBars: state.build.system.toLowerCase() !== 'ios' && state.theme.scroll.hiddenBars,
    hideShareBar: shareBar.hide,
  };
};

export default connect(mapStateToProps)(
  inject(({ connection }) => {
    const { id, type, route, next, fromList } = connection.selected;

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
