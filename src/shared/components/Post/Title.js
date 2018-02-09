import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const Title = ({ title }) => <Container dangerouslySetInnerHTML={{ __html: title }} />;

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default inject(({ connection }, { id }) => ({
  title: connection.single.post[id].title,
}))(Title);

const Container = styled.h1`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  margin-bottom: 10px;
  padding: 20px 15px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.2rem;
  border-bottom: 1px solid #eee;
`;
