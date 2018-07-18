/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Link from '../Link';
import NextIcon from '../../../shared/components/Icons/AngleRight';
import { Container, Text } from '../../../shared/styled/ShareBar/NextButton';

const NextButton = ({ type, id, page, fetching, next, loading }) => {
  if (fetching) {
    return (
      <Container>
        <Text>{loading}</Text>
      </Container>
    );
  }

  return (
    <Link
      type={type}
      id={id}
      page={page}
      eventCategory="Share bar"
      eventAction="next"
    >
      <Container>
        <Text>{next}</Text>
        <NextIcon size={20} />
      </Container>
    </Link>
  );
};

NextButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  page: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  next: PropTypes.string.isRequired,
  loading: PropTypes.string.isRequired,
};

NextButton.defaultProps = {
  page: null,
};

export default inject(({ stores: { connection, theme } }) => ({
  type: connection.selectedColumn.nextColumn.selectedItem.type,
  id: connection.selectedColumn.nextColumn.selectedItem.id,
  page: connection.selectedColumn.nextColumn.selectedItem.page,
  ready: connection.selectedColumn.nextColumn.selectedItem.entity.isReady,
  fetching: connection.selectedColumn.nextColumn.selectedItem.entity.isFetching,
  next: theme.lang.get('next'),
  loading: theme.lang.get('loading'),
}))(NextButton);
