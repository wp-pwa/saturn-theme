import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import readingTime from 'reading-time';
import Icon from '../../../shared/components/Icons/Time';

const ReadingTime = ({ readingTimeText }) => (
  <Container>
    <Icon size={18} />
    <Text>{readingTimeText}</Text>
  </Container>
);

ReadingTime.propTypes = {
  readingTimeText: PropTypes.string.isRequired,
};

export default inject(({ stores: { connection, theme } }, { type, id }) => {
  const time = Math.round(
    readingTime(connection.entity(type, id).content).minutes,
  );

  return {
    readingTimeText: theme.lang.getReadingTime(time),
  };
})(ReadingTime);

const Container = styled.div`
  margin: 0;
  padding: 5px;
  padding-left: 15px;
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
