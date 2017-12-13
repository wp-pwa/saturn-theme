import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Context from './Context';

class Contexts extends Component {
  static propTypes = {
    contexts: PropTypes.shape({}).isRequired,
    activeContext: PropTypes.number.isRequired,
  };

  constructor() {
    super();

    this.renderContext = this.renderContext.bind(this);
  }

  renderContext(context, index) {
    const { activeContext } = this.props;

    if (activeContext !== index) return null;

    const { columns, column } = context;
    const selectedColumn = columns.indexOf(column);

    return (
      <Context
        key={index}
        context={context.index}
        selectedColumn={selectedColumn}
        bar={context.options.bar}
      />
    );
  }

  render() {
    const { contexts } = this.props;

    return contexts.map(this.renderContext);
  }
}

export default inject(({ connection }) => ({
  contexts: connection.contexts,
  activeContext: connection.contexts.indexOf(connection.context),
}))(Contexts);
