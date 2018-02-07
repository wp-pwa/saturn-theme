import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import {
  Container,
  Text,
  StyledIconNext,
  StyledIconBack,
} from '../../../shared/styled/ShareBar/ArrowButton';

const ArrowButton = ({ isListLoading, next, back, Link }) => {
  if (isListLoading) {
    return (
      <Container>
        <Text>Cargando...</Text>
      </Container>
    );
  }

  let selected;

  if (next) {
    selected = { singleType: next.type, singleId: next.id };
  } else if (back) {
    selected = { singleType: back.type, singleId: back.id };
  } else {
    selected = null;
  }

  return (
    <Link selected={selected}>
      <Container>
        {/* <Text>Siguiente</Text> */}
        {next && <StyledIconNext verticalAlign="none" />}
        {back && <StyledIconBack verticalAlign="none" />}
      </Container>
    </Link>
  );
};

ArrowButton.propTypes = {
  isListLoading: PropTypes.bool,
  next: PropTypes.shape({}),
  back: PropTypes.shape({}),
  Link: PropTypes.func.isRequired,
};

ArrowButton.defaultProps = {
  isListLoading: null,
  next: null,
  back: null,
};

const mapStateToProps = () => ({
  Link: dep('connection', 'components', 'Link'),
});

export default connect(mapStateToProps)(ArrowButton);
