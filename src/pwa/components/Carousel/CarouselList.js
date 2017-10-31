import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CarouselItem from './CarouselItem';

class CarouselList extends Component {
  constructor() {
    super();

    this.renderItems = this.renderItems.bind(this);
  }

  renderItems(id) {
    const { newListParams, listName } = this.props;

    return <CarouselItem key={id} id={id} listName={listName} newListParams={newListParams} />;
  }

  render() {
    const { size, list } = this.props;

    return <Container size={size}>{list.map(this.renderItems)}</Container>;
  }
}

CarouselList.propTypes = {
  size: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.number).isRequired,
  newListParams: PropTypes.shape({}).isRequired,
  listName: PropTypes.string.isRequired,
};

export default CarouselList;

const Container = styled.ul`
  height: ${({ size }) => {
    if (size === 'small') return 130;
    if (size === 'medium') return 220;
    if (size === 'large') return 270;
    return 220;
  }}px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: stretch;
  list-style: none;
  margin: 0 !important;
  padding: 0;
  overflow-x: scroll;
  -webkit-overflow-scrolling: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
