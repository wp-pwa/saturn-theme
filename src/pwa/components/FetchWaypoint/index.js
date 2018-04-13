import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Waypoint from 'react-waypoint';
import styled from 'react-emotion';
import Spinner from '../../elements/Spinner';
import * as actions from '../../actions';

const FetchWaypoint = ({
  limit,
  fetching,
  total,
  lastInColumn,
  columnLength,
  isSelectedColumn,
  getNextPage,
}) => {
  if (fetching)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  if (lastInColumn === total) return null;

  if (!isSelectedColumn) return <Container />;

  return (
    <Container>
      {!limit || columnLength < limit ? (
        <Waypoint onEnter={getNextPage} bottomOffset={-500} scrollableAncestor="window" />
      ) : (
        <LoadButton onClick={getNextPage}>Cargar más</LoadButton>
      )}
    </Container>
  );
};

FetchWaypoint.propTypes = {
  limit: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  total: PropTypes.number,
  lastInColumn: PropTypes.number.isRequired,
  columnLength: PropTypes.number.isRequired,
  isSelectedColumn: PropTypes.bool.isRequired,
  getNextPage: PropTypes.func.isRequired,
};

FetchWaypoint.defaultProps = {
  limit: null,
  total: null,
};

const mapDispatchToProps = dispatch => ({
  getNextPage: () => dispatch(actions.fetch.getNextPage()),
});

export default compose(
  inject(({ connection }, { type, id }) => ({
    fetching: connection.list(type, id).fetching,
    total: connection.list(type, id).total.pages,
    lastInColumn: connection.selectedColumn.items[connection.selectedColumn.items.length - 1].page,
  })),
  connect(null, mapDispatchToProps),
)(FetchWaypoint);

const Container = styled.div`
  box-sizing: border-box;
  height: 80px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  padding: 10px;
`;

const LoadButton = styled.button`
  height: 60px;
  width: 100%;
  box-shadow: inset 0 0 5px 0 #999;
  color: #333;
  border: none;
  border-radius: 5px;
  background-color: rgba(220, 220, 220, 0.75);
`;
