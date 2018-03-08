import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import styled from 'react-emotion';

const Title = ({ title, isAlone, rtl }) => (
  <Container isAlone={isAlone} dangerouslySetInnerHTML={{ __html: title }} rtl={rtl} />
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
  isAlone: PropTypes.bool.isRequired,
  rtl: PropTypes.bool,
};

Title.defaultProps = {
  rtl: false,
};

const mapStateToProps = state => {
  const localisation =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'localisation')(state) || {};

  return {
    rtl: localisation.rtl,
  };
};

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { id }) => ({
    title: connection.single.post[id].title,
  })),
)(Title);

const Container = styled.h1`
  box-sizing: border-box;
  width: 100%;
  padding: 0 15px;
  margin: ${({ isAlone }) => (isAlone ? '20px 0 5px 0' : '20px 0')};
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.2rem;
  ${({ rtl }) => (rtl ? 'direction: rtl' : null)};
`;
