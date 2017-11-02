import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import LazyLoad from 'react-lazy-load';
import CarouselList from './CarouselList';

class Carousel extends Component {
  componentWillMount() {
    const { listName, isReady, newPostsListRequested, params } = this.props;
    const plurals = dep('connection', 'constants', 'wpTypesSingularToPlural');

    if (!isReady)
      newPostsListRequested({ name: listName, params: { [plurals[params.type]]: params.id } });
  }

  render() {
    const { title, size, list, isReady } = this.props;

    return isReady && list && list.length ? (
      <LazyLoad offsetVertical={300}>
        <Container>
          <Title>{title}</Title>
          <CarouselList list={list} size={size} />
        </Container>
      </LazyLoad>
    ) : null;
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
};

const mapStateToProps = (state, { listName, params }) => ({
  isReady: dep('connection', 'selectorCreators', 'isListReady')(listName, params)(state),
  list: dep('connection', 'selectorCreators', 'getListResults')(listName, params)(state),
});

const mapDispatchToProps = dispatch => ({
  newPostsListRequested: payload =>
    dispatch(dep('connection', 'actions', 'newPostsListRequested')(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  margin-bottom: 30px;
`;

const Title = styled.h4`
  margin: 0;
  margin-top: 20px;
  padding: 0 15px 10px 15px;
`;
