import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CarouselList from './CarouselList';
import * as selectorCreators from '../../selectorCreators';

const Carousel = ({ title, list, isReady }) =>
  isReady ? (
    <Container>
      <h4>{title}</h4>
      <CarouselList list={list} />
    </Container>
  ) : null;

Carousel.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.number).isRequired,
  isReady: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, options) => ({
  list: selectorCreators.list.getList(options)(state),
  isReady: selectorCreators.list.isListReady(options)(state),
});

export default connect(mapStateToProps)(Carousel);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0 10px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  margin-bottom: 5px;
`;
