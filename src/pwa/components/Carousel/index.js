import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import LazyLoad from 'react-lazy-load';
import IconCarousel from 'react-icons/lib/md/view-carousel';
import CarouselList from './CarouselList';

class Carousel extends Component {
  componentWillMount() {
    const { listName, isReady, newPostsListRequested, params } = this.props;
    const plurals = dep('connection', 'constants', 'wpTypesSingularToPlural');

    if (!isReady)
      newPostsListRequested({ name: listName, params: { [plurals[params.type]]: params.id } });
  }

  render() {
    const { title, size, list, isReady, params, listName } = this.props;
    const plurals = dep('connection', 'constants', 'wpTypesSingularToPlural');
    const newListParams = { name: 'currentList', params: { [plurals[params.type]]: params.id } };

    return isReady && list && list.length ? (
      <Container>
        <Title>{title}</Title>
        {/* {isReady ? (
          <LazyLoad offsetVertical={500}> */}
        <CarouselList list={list} size={size} listName={listName} newListParams={newListParams} />
        {/* </LazyLoad>
        ) : (
          <IconWrapper size={size}>
            <IconCarousel size={40} />
          </IconWrapper>
        )} */}
      </Container>
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
  margin: 20px 0 10px 0;
  padding: 0 15px;
`;
