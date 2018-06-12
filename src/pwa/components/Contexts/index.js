import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Context from './Context';

const Contexts = ({ contexts }) =>
  contexts.map(
    context =>
      context.isSelected ? <Context key={context.index} bar={context.options.bar} /> : null,
  );

Contexts.propTypes = {
  contexts: PropTypes.shape({}).isRequired,
};

export default inject(({ stores: { connection } }) => ({
  contexts: connection.contexts,
  contextLength: connection.contexts.length,
  selectedContext: connection.selectedContext,
}))(Contexts);
