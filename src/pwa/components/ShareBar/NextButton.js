import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import { Container, Text, StyledIconNext } from '../../../shared/styled/ShareBar/NextButton';

const NextButton = ({ isListLoading, next, Link }) => {
  if (isListLoading) {
    return (
      <Container>
        <Text>Cargando...</Text>
      </Container>
    );
  }

  const nextSelected = next ? { singleType: next.type, singleId: next.id } : null;

  return (
    <Link selected={nextSelected} event={{ category: 'Share bar', action: 'next' }}>
      <Container>
        <Text>Siguiente</Text>
        <StyledIconNext verticalAlign="none" />
      </Container>
    </Link>
  );
};

NextButton.propTypes = {
  isListLoading: PropTypes.bool.isRequired,
  next: PropTypes.shape({}),
  Link: PropTypes.func.isRequired,
};

NextButton.defaultProps = {
  next: null,
};

const mapStateToProps = () => ({
  Link: dep('connection', 'components', 'Link'),
});

export default connect(mapStateToProps)(NextButton);
