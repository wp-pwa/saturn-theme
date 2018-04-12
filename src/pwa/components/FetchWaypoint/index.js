import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Waypoint from 'react-waypoint';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Spinner from '../../elements/Spinner';

class FetchWaypoint extends Component {
  constructor(props) {
    super(props);
    this.renderWaypointContent = this.renderWaypointContent.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { lastPageReady, fetched } = this.props;

    if (fetched > 1 && lastPageReady && lastPageReady !== prevProps.lastPageReady) {
      this.props.addItemToColumn();
    }
  }

  renderWaypointContent() {
    const { limit, fetched, fetching, listRequested, isInSelectedColumn } = this.props;

    if (fetching) return <Spinner />;

    if (isInSelectedColumn && (!limit || fetched < limit))
      return <Waypoint onEnter={listRequested} bottomOffset={-500} scrollableAncestor="window" />;

    return <LoadButton onClick={listRequested}>Cargar más</LoadButton>;
  }

  render() {
    const { total, fetched, fetching } = this.props;

    if (fetched >= total) {
      if (fetching) {
        return (
          <Container>
            <Spinner />
          </Container>
        );
      }

      return null;
    }

    return <Container>{this.renderWaypointContent()}</Container>;
  }
}

FetchWaypoint.propTypes = {
  limit: PropTypes.number,
  total: PropTypes.number,
  fetched: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  lastPageReady: PropTypes.bool.isRequired,
  listRequested: PropTypes.func.isRequired,
  addItemToColumn: PropTypes.func.isRequired,
  isInSelectedColumn: PropTypes.bool.isRequired,
};

FetchWaypoint.defaultProps = {
  limit: null,
  total: null,
  fetched: null,
};

const mapDispatchToProps = (dispatch, { type, id, fetched }) => ({
  listRequested: () =>
    dispatch(
      dep('connection', 'actions', 'listRequested')({
        list: {
          type,
          id,
          page: fetched + 1,
        },
      }),
    ),
  addItemToColumn: () =>
    dispatch(
      dep('connection', 'actions', 'addItemToColumn')({
        item: {
          type,
          id,
          page: fetched,
        },
      }),
    ),
});

export default compose(
  inject(({ connection }, { id, type, columnIndex }) => ({
    total: connection.list(type, id).total.pages,
    fetched: connection.list(type, id).total.fetched.pages,
    fetching: connection.list(type, id).fetching,
    lastPageReady: connection.list(type, id).page(connection.list(type, id).total.fetched.pages)
      .ready,
    isInSelectedColumn: columnIndex === connection.selectedColumn.index,
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
