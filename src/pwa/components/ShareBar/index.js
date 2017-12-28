/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import Shares from './Shares';
import NextButton from './NextButton';

const ShareBar = ({
  id,
  type,
  hiddenBars,
  title,
  link,
  ready,
  isListLoading,
  isLastSlide,
  next
}) => {
  const email = `mailto:?body=${encodeURIComponent(`${title}\n${link}`)}`;

  return ready ? (
    <Container isHidden={hiddenBars}>
      <Shares id={id} type={type} title={title} link={link} email={email} />
      {isLastSlide && !isListLoading ? null : (
        <NextButton next={next} isListLoading={isListLoading} />
      )}
    </Container>
  ) : null;
};

ShareBar.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hiddenBars: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  isListLoading: PropTypes.bool.isRequired,
  isLastSlide: PropTypes.bool.isRequired,
  next: PropTypes.shape({})
};

ShareBar.defaultProps = {
  title: null,
  link: null,
  type: null,
  id: null,
  next: null
};

const mapStateToProps = state => ({
  hiddenBars: state.theme.scroll.hiddenBars
});

export default compose(
  connect(mapStateToProps),
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
        email: `mailto:?body=${encodeURIComponent(`${title}\n${link}`)}`,
        ready: true,
        isListLoading: currentList.fetching,
        isLastSlide: !next || !next.id,
        next
      };
    }

    return {
      ready: false
    };
  })
)(ShareBar);

const Container = styled.div`
  transform: translateY(${({ theme, isHidden }) => (isHidden ? theme.shareBarHeight : 0)});
  transition: transform 0.3s ease;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  height: ${({ theme }) => theme.shareBarHeight};
  background-color: ${({ theme }) => theme.bgColor};
  z-index: 50;
`;
