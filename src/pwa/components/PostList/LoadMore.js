/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import styled from 'styled-components';
import { emojify } from 'react-emojione';
import Spinner from '../../elements/Spinner';
import * as deps from '../../deps';

const LoadMore = ({ requestAnotherPage, retrieved, total, isLoading, title }) => {
  const pageLimit = 3;

  return (
    <Container>
      {(() => {
        if (isLoading) {
          return <Spinner />;
        }

        if (retrieved >= total) {
          return (
            <Congratulations>
              <div>
                {`Te has pasado ${title}.`}
              </div>
              <div>
                {'¡Enhorabuena! '}
                <span>
                  {emojify(':tada:')}
                </span>
              </div>
            </Congratulations>
          );
        }

        if (retrieved < pageLimit) {
          return <Waypoint onEnter={requestAnotherPage} bottomOffset={-600} />;
        }

        return (
          <button onClick={requestAnotherPage}>
            {'Cargar más'}
          </button>
        );
      })()}
    </Container>
  );
};

LoadMore.propTypes = {
  requestAnotherPage: PropTypes.func,
  retrieved: PropTypes.number,
  total: PropTypes.number,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  retrieved: deps.selectorCreators.getNumberOfRetrievedPages('currentList')(state),
  total: deps.selectorCreators.getNumberOfTotalPages('currentList')(state),
  isLoading: deps.selectorCreators.isListLoading('currentList')(state),
  title: deps.selectorCreators.getSetting('generalApp', 'title')(state),
});

const mapDispatchToProps = dispatch => ({
  requestAnotherPage: () => dispatch(deps.actions.anotherPostsPageRequested()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadMore);

const Container = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;

  button {
    height: 60px;
    width: 100%;
    box-shadow: 0 0 3px 0 #999;
    color: #333;
  }
`;

const Congratulations = styled.div`text-align: center;`;
