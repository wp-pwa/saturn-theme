import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { dep } from 'worona-deps';
import { Container, Text, StyledIconNext } from '../../../shared/styled/ShareBar/NextButton';

const NextButton = ({ type, id, page, fetching, Link, next, loading }) => {
  if (fetching) {
    return (
      <Container>
        <Text>{loading}</Text>
      </Container>
    );
  }

  return (
    <Link type={type} id={id} page={page} eventCategory="Share bar" eventAction="next">
      <Container>
        <Text>{next}</Text>
        <StyledIconNext verticalAlign="none" />
      </Container>
    </Link>
  );
};

NextButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  page: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  Link: PropTypes.func.isRequired,
  next: PropTypes.string.isRequired,
  loading: PropTypes.string.isRequired,
};

NextButton.defaultProps = {
  page: null,
};

export default inject(({ connection, theme }) => ({
  type: connection.selectedColumn.nextColumn.selectedItem.type,
  id: connection.selectedColumn.nextColumn.selectedItem.id,
  page: connection.selectedColumn.nextColumn.selectedItem.page,
  ready: connection.selectedColumn.nextColumn.selectedItem.entity.ready,
  fetching: connection.selectedColumn.nextColumn.selectedItem.entity.fetching,
  Link: dep('connection', 'components', 'Link'),
  next: theme.localization.getText('next'),
  loading: theme.localization.getText('loading'),
}))(NextButton);
