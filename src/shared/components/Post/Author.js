import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import fecha from 'fecha';

const Author = ({ author, creationDate }) => {
  const date = new Date(creationDate).getTime();
  return (
    <Container>
      {/* {writtenBy} */}
      {author}
      <Fecha>{fecha.format(date, 'DD/MM/YYYY [-] HH:mm')}</Fecha>
    </Container>
  );
};

Author.propTypes = {
  author: PropTypes.string.isRequired,
  // writtenBy: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
};

export default inject(({ stores: { connection, theme } }, { type, id }) => ({
  author: connection.entity(type, id).author.name,
  // writtenBy: theme.lang.get('writtenBy'),
  creationDate: connection.entity(type, id).creationDate,
}))(Author);

const Container = styled.div`
  font-weight: 800;
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  padding: 5px 15px;
  margin: 0;
  font-size: 0.8rem;
`;

const Fecha = styled.span`
  padding-left: 10px;
  font-weight: 500;
`;
