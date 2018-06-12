import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Waypoint from 'react-waypoint';
import styled from 'react-emotion';
import Spinner from '../../elements/Spinner';

const FetchWaypoint = ({
  limit,
  fetching,
  total,
  lastInColumn,
  columnLength,
  isSelectedColumn,
  getNextPage,
  loadMore,
}) => {
  if (fetching)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  if (!lastInColumn || lastInColumn === total) return null;

  if (!isSelectedColumn) return <Container />;

  return (
    <Container>
      {!limit || columnLength < limit ? (
        <Waypoint onEnter={getNextPage} bottomOffset={-500} scrollableAncestor="window" />
      ) : (
        <LoadButton onClick={getNextPage}>{loadMore}</LoadButton>
      )}
    </Container>
  );
};

FetchWaypoint.propTypes = {
  limit: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  total: PropTypes.number,
  lastInColumn: PropTypes.number,
  columnLength: PropTypes.number.isRequired,
  isSelectedColumn: PropTypes.bool.isRequired,
  getNextPage: PropTypes.func.isRequired,
  loadMore: PropTypes.string.isRequired,
};

FetchWaypoint.defaultProps = {
  limit: null,
  total: null,
  lastInColumn: null,
};

export default inject(({ stores: { connection, theme } }, { type, id, columnId }) => ({
  fetching: connection.list(type, id).isFetching,
  total: connection.list(type, id).total.pages,
  lastInColumn: connection.selectedColumn.items[connection.selectedColumn.items.length - 1].page,
  isSelectedColumn: connection.selectedContext.getColumn(columnId).isSelected,
  loadMore: theme.lang.get('loadMore'),
  getNextPage: theme.getNextPage,
}))(FetchWaypoint);

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
