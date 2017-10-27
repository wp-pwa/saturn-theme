/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import Spinner from '../../elements/Spinner';

const LoadMore = ({ requestAnotherPage, retrieved, total, isLoading, title }) => {
  const pageLimit = 3;

  if (isLoading)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  if (retrieved >= total)
    return (
      <Container>
        <Congratulations>
          <div>{`Te has pasado ${title}.`}</div>
          <div>
            <span>{'¡Enhorabuena! '}</span>
            <span>{'🎉'}</span>
          </div>
        </Congratulations>
      </Container>
    );

  if (retrieved < pageLimit) return <Waypoint onEnter={requestAnotherPage} bottomOffset={-600} />;

  return (
    <Container>
      <LoadButton onClick={requestAnotherPage}>{'Cargar más'}</LoadButton>
    </Container>
  );
};

LoadMore.propTypes = {
  requestAnotherPage: PropTypes.func.isRequired,
  retrieved: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { name }) => ({
  retrieved: dep('connection', 'selectorCreators', 'getNumberOfRetrievedPages')(name)(state),
  total: dep('connection', 'selectorCreators', 'getNumberOfTotalPages')(name)(state),
  isLoading: dep('connection', 'selectorCreators', 'isListLoading')(name)(state),
  title: dep('settings', 'selectorCreators', 'getSetting')('generalApp', 'title')(state),
});

const mapDispatchToProps = (dispatch, { name }) => ({
  requestAnotherPage: () =>
    dispatch(dep('connection', 'actions', 'anotherPostsPageRequested')({ name })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadMore);

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
  box-shadow: 0 0 3px 0 #999;
  color: #333;
`;

const Congratulations = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  text-align: center;
`;
