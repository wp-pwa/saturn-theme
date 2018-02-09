import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const Author = ({ author }) => <Container>{author}</Container>;

Author.propTypes = {
  author: PropTypes.string.isRequired,
};

export default inject(({ connection }, { id }) => ({
  author: connection.single.post[id].author.name,
}))(Author);

const Container = styled.div`
  font-weight: 300;
  padding: 5px 15px;
  color: ${({ theme }) => theme.colors.grey};
  margin: 0;
  font-size: 0.9rem;
  text-transform: uppercase;
`;
