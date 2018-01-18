import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

const SlideNumber = ({ index, total }) => (
  <Container>
    <Number align="right">{index}</Number>
    <Bar>/</Bar>
    <Number align="left">{total}</Number>
  </Container>
);

SlideNumber.propTypes = {
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default inject(({ connection }) => {
  const { columns, column } = connection.context;
  return {
    index: columns.indexOf(column) + 1,
    total: columns.length,
  };
})(SlideNumber);

const Container = styled.div`
  z-index: 51;
  box-sizing: border-box;
  width: calc(100vw - (2 * ${({ theme }) => theme.heights.bar}));
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Number = styled.div`
  width: 3em;
  line-height: 100%;
  text-align: ${({ align }) => (align === 'left' ? 'left' : 'right')};
`;

const Bar = styled.div`
  width: 1em;
  line-height: 100%;
  text-align: center;
`;
