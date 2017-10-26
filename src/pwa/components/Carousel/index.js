import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import CarouselList from './CarouselList';
import * as selectorCreators from '../../selectorCreators';

class Carousel extends Component {
  componentWillMount() {
    const { listName, isReady, newPostsListRequested, params } = this.props;

    if (!isReady) newPostsListRequested({ name: listName, params: { [params.type]: params.id } });
  }

  render() {
    const { title, size, list, isReady, areSameList } = this.props;

    return (
      isReady &&
      !areSameList && (
        <Container>
          <Title>{title}</Title>
          <CarouselList size={size} list={list} />
        </Container>
      )
    );
  }
}

Carousel.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  listName: PropTypes.string.isRequired,
  params: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.number,
    exclude: PropTypes.number,
    excludeTo: PropTypes.number,
    excludeFrom: PropTypes.number,
    limit: PropTypes.number,
  }).isRequired,
  isReady: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.number).isRequired,
  newPostsListRequested: PropTypes.func.isRequired,
  areSameList: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, { listName, params }) => ({
  isReady: dep('connection', 'selectorCreators', 'isListReady')(listName, params)(state),
  list: dep('connection', 'selectorCreators', 'getListResults')(listName, params)(state),
  areSameList: selectorCreators.list.areSameList('currentList', listName)(state),
});

const mapDispatchToProps = dispatch => ({
  newPostsListRequested: payload =>
    dispatch(dep('connection', 'actions', 'newPostsListRequested')(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0 10px;
  padding: 10px 0;
  margin-bottom: 5px;
`;

const Title = styled.h4`
  margin: 0;
  margin-bottom: 15px;
`;
