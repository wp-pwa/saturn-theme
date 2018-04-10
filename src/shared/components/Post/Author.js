import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const Author = ({ author }) => <Container>Escrito por {author}</Container>;

Author.propTypes = {
  author: PropTypes.string.isRequired,
};

export default inject(({ connection }, { type, id }) => ({
  author: connection.entity(type, id).author.name,
}))(Author);

const Container = styled.div`
  font-weight: 300;
  padding: 5px 15px;
  margin: 0;
  font-size: 0.9rem;
`;
