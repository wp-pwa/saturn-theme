import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CarouselItem from './CarouselItem';

class CarouselList extends Component {
  static renderItems(id) {
    return <CarouselItem key={id} id={id} />;
  }

  render() {
    return <Container>{this.props.list.map(CarouselList.renderItems)}</Container>;
  }
}

CarouselList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default CarouselList;

const Container = styled.ul`
  height: 150px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: stretch;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-x: scroll;
  -webkit-overflow-scrolling: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
