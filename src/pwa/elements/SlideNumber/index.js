import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import XofY from '../../../shared/components/XofY'

const SlideNumber = ({ index, total }) => <XofY x={index} y={total} />

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
