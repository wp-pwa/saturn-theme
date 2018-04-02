import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import readingTime from 'reading-time';
import Icon from 'react-icons/lib/md/access-time';

const ReadingTime = ({ time }) => (
  <Container>
    <Icon size={18} verticalAlign="none" />
    <Text>{`${time} minutos`}</Text>
  </Container>
);

ReadingTime.propTypes = {
  time: PropTypes.number.isRequired,
};

export default inject(({ connection }, { id }) => ({
  time: Math.round(readingTime(connection.entity('post', id).content).minutes),
}))(ReadingTime);

const Container = styled.div`
  margin: 0;
  padding: 5px 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
`;

const Text = styled.span`
  font-weight: 300;
  font-size: 0.9rem;
  padding-left: 5px;
`;
