import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import fecha from 'fecha';

const Fecha = ({ creationDate }) => {
  const date = new Date(creationDate).getTime();

  return <Container>{fecha.format(date, 'DD/MM/YYYY [-] HH:mm')}</Container>;
};

Fecha.propTypes = {
  creationDate: PropTypes.number.isRequired,
};

export default inject(({ stores: { connection } }, { type, id }) => ({
  creationDate: connection.entity(type, id).creationDate,
}))(Fecha);

const Container = styled.div`
  font-weight: 300;
  margin: 0;
  padding: 5px 15px;
  font-size: 0.9rem;
  text-align: right;
`;
