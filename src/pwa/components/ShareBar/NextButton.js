import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import IconNext from 'react-icons/lib/fa/angle-right';
import { dep } from 'worona-deps';

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
    <Link selected={nextSelected}>
      <Container>
        <Text>Siguiente</Text>
        <StyledIconNext />
      </Container>
    </Link>
  );
};

NextButton.propTypes = {
  isListLoading: PropTypes.bool.isRequired,
  next: PropTypes.shape({}),
  Link: PropTypes.func.isRequired
};

NextButton.defaultProps = {
  next: null
};

const mapStateToProps = () => ({
  Link: dep('connection', 'components', 'Link')
});

export default connect(mapStateToProps)(NextButton);

const Container = styled.a`
  box-sizing: border-box;
  height: 56px;
  margin: 0;
  padding: 0 10px;
  width: 130px;
  background-color: ${({ theme }) => theme.bgColor};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  text-decoration: none;
  flex-shrink: 0;

  &,
  &:visited {
    color: ${({ theme }) => theme.color};
  }
`;

const Text = styled.span`
  text-transform: uppercase;
  padding-top: 1px;
  text-overflow: ellipsis;
`;

const StyledIconNext = styled(IconNext)`
  height: 1em;
  width: 1em;
  padding-bottom: 1px;
  padding-left: 0px;
`;
