import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import LazyLoad from 'react-lazy-load';
import CarouselList from './CarouselList';
import Spinner from '../../elements/Spinner';

class Carousel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // params: PropTypes.shape({
    //   type: PropTypes.string,
    //   id: PropTypes.number,
    //   exclude: PropTypes.number,
    //   excludeTo: PropTypes.number,
    //   excludeFrom: PropTypes.number,
    //   limit: PropTypes.number,
    // }).isRequired,
    ready: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(PropTypes.number),
    listRequested: PropTypes.func.isRequired,
  };

  static defaultProps = {
    list: null,
  };

  // componentWillMount() {
  //   const { type, id, ready, listRequested, params } = this.props;
  //
  //   if (!ready) listRequested({ listType: type, listId: id });
  // }

  render() {
    const { title, size, list, ready } = this.props;

    return (
      <Container>
        <Title>{title}</Title>
        {ready ? (
          // <LazyLoad offsetVertical={300}>
          // <CarouselList list={list} size={size} />
          // </LazyLoad>
          'ready'
        ) : (
          <SpinnerContainer size={size}>
            <Spinner />
          </SpinnerContainer>
        )}
      </Container>
    );
  }
}

const mapStateToProps = () => ({
  // isReady: dep('connection', 'selectorCreators', 'isListReady')(listName, params)(state),
  // list: dep('connection', 'selectorCreators', 'getListResults')(listName, params)(state),
});

const mapDispatchToProps = dispatch => ({
  listRequested: payload => dispatch(dep('connection', 'actions', 'listRequested')(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  inject(({ connection }, { id, type }) => {
    const list =
      connection.list[type] && connection.list[type][id] && connection.list[type][id].entities;
    const ready = !!list && list.ready && !list.fetching;

    return {
      ready,
      list,
    };
  })(Carousel),
);

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

const SpinnerContainer = styled.div`
  height: ${({ size }) => {
    if (size === 'small') return 130;
    if (size === 'medium') return 220;
    if (size === 'large') return 270;
    return 220;
  }}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
