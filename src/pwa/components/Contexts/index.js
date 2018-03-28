import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Context from './Context';

const Contexts = ({ contexts, activeContext }) =>
  contexts.map((context, index) => {
    if (activeContext !== index) return null;

    const activeColumn = context.columns.indexOf(context.selectedColumn);

    return <Context key={context.index} activeColumn={activeColumn} bar={context.options.bar} />;
  });

Contexts.propTypes = {
  contexts: PropTypes.shape({}).isRequired,
  activeContext: PropTypes.number.isRequired,
};

export default inject(({ connection }) => ({
  contexts: connection.contexts,
  activeContext: connection.contexts.indexOf(connection.selectedContext),
}))(Contexts);
