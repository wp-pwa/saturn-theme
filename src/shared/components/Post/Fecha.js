import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import fecha from 'fecha';

const Fecha = ({ date }) => <Container>{date}</Container>;

Fecha.propTypes = {
  date: PropTypes.string.isRequired,
};

export default inject(({ connection }, { id }) => ({
  date: fecha.format(new Date(connection.single.post[id].creationDate), 'DD.MM.YYYY - HH:mm[h]'),
}))(Fecha);

const Container = styled.div`
  font-weight: 300;
  margin: 0;
  padding: 5px 15px;
  color: ${({ theme }) => theme.colors.grey};
  font-size: 0.9rem;
  text-align: right;
`;
