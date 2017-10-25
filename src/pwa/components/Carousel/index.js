import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import CarouselList from './CarouselList';

class Carousel extends Component {
  componentWillMount() {
    const { listName, isReady, newPostListRequested, params } = this.props;

    if (!isReady) newPostListRequested({ name: listName, [params.type]: params.id });
  }

  render() {
    const { title, list, isReady } = this.props;

    return isReady ? (
      <Container>
        <h4>{title}</h4>
        <CarouselList list={list} />
      </Container>
    ) : null;
  }
}

Carousel.propTypes = {
  title: PropTypes.string.isRequired,
  listName: PropTypes.string.isRequired,
  params: PropTypes.shape({}).isRequired,
  isReady: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.number).isRequired,
  newPostListRequested: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { listName, params }) => ({
  isReady: dep('connection', 'selectorCreators', 'isListReady')(listName, params)(state),
  list: dep('connection', 'selectorCreators', 'getListResults')(listName, params)(state),
});

const mapDispatchToProps = dispatch => ({
  newPostListRequested: payload =>
    dispatch(dep('connection', 'actions', 'newPostListRequested')(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0 10px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  margin-bottom: 5px;
`;
