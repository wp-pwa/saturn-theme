import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const Author = ({ author, writtenBy }) => (
  <Container>
    {writtenBy} {author}
  </Container>
);

Author.propTypes = {
  author: PropTypes.string.isRequired,
  writtenBy: PropTypes.string.isRequired,
};

export default inject(({ connection, theme }, { type, id }) => ({
  author: connection.entity(type, id).author.name,
  writtenBy: theme.lang.get('writtenBy'),
}))(Author);

const Container = styled.div`
  font-weight: 300;
  padding: 5px 15px;
  margin: 0;
  font-size: 0.9rem;
`;
