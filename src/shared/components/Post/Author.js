import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const Author = ({ author }) => <Container>{author}</Container>;

Author.propTypes = {
  author: PropTypes.string.isRequired,
};

export default inject(({ stores: { connection } }, { type, id }) => ({
  author: connection.entity(type, id).author.name,
}))(Author);

const Container = styled.span`
  font-weight: 800;
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  padding: 0 15px;
  margin: 0;
  font-size: 0.8rem;
`;
