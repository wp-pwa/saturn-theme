import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Waypoint from 'react-waypoint';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Spinner from '../../elements/Spinner';

const LoadMore = ({ total, fetched, fetching, listRequested }) => {
  const pageLimit = 3;

  if (fetching)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  if (fetched >= total) return null;

  if (fetched < pageLimit) {
    return <Waypoint onEnter={listRequested} bottomOffset={-600} scrollableAncestor="window" />;
  }

  return (
    <Container>
      <LoadButton onClick={listRequested}>Cargar más</LoadButton>
    </Container>
  );
};

LoadMore.propTypes = {
  total: PropTypes.number.isRequired,
  fetched: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
  listRequested: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, { id, type, fetched }) => ({
  listRequested: () =>
    dispatch(
      dep('connection', 'actions', 'listRequested')({
        listId: id,
        listType: type,
        // Page should be calculated in some other way, just in case the pages shown
        // don't start with the first one.
        // Actually, this should be synced with the context.
        page: fetched + 1
      })
    )
});

export default compose(
  inject(({ connection }, { id, type }) => {
    const list = connection.list[type][id];
    return {
      total: list.total.pages,
      fetched: list.total.fetched.pages,
      fetching: list.fetching
    };
  }),
  connect(null, mapDispatchToProps)
)(LoadMore);

const Container = styled.div`
  box-sizing: border-box;
  height: 80px;
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
