import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { dep } from 'worona-deps';
import { Container, Text, StyledIconNext } from '../../../shared/styled/ShareBar/NextButton';

const NextButton = ({ type, id, page, ready, fetching, Link }) => {
  if (fetching) {
    return (
      <Container>
        <Text>Cargando...</Text>
      </Container>
    );
  }

  return ready ? (
    <Link item={{ type, id, page }} event={{ category: 'Share bar', action: 'next' }}>
      <Container>
        <Text>Siguiente</Text>
        <StyledIconNext verticalAlign="none" />
      </Container>
    </Link>
  ) : null;
};

NextButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  page: PropTypes.number,
  ready: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  Link: PropTypes.func.isRequired,
};

NextButton.defaultProps = {
  page: null,
};

export default inject(({ connection }) => ({
  type: connection.selectedColumn.nextColumn.selectedItem.type,
  id: connection.selectedColumn.nextColumn.selectedItem.id,
  page: connection.selectedColumn.nextColumn.selectedItem.page,
  ready: connection.selectedColumn.nextColumn.selectedItem.entity.ready,
  fetching: connection.selectedColumn.nextColumn.selectedItem.entity.fetching,
  Link: dep('connection', 'components', 'Link'),
}))(NextButton);
