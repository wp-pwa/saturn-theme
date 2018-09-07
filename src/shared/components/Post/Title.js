import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';

const Title = ({ title, isAlone }) => (
  <Container isAlone={isAlone} dangerouslySetInnerHTML={{ __html: title }} />
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
  isAlone: PropTypes.bool.isRequired,
};

export default inject(({ stores: { connection } }, { type, id }) => ({
  title: connection.entity(type, id).title,
}))(Title);

const Container = styled.h1`
  box-sizing: border-box;
  width: 100%;
  padding: 0 15px;
  margin: ${({ isAlone }) => (isAlone ? '10px 0 5px 0' : '10px 0')};
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.2rem;
`;
