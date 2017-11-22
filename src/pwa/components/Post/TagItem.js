import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import * as selectorCreators from '../../selectorCreators';

const TagItem = ({ id, type, name, Link }) => (
  <Container>
    <Link type={type} id={id}>
      <A>{name}</A>
    </Link>
  </Container>
);

TagItem.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  Link: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { id, type }) => ({
  name: selectorCreators.post[`get${type.charAt(0).toUpperCase() + type.slice(1)}Name`](id)(state),
  Link: dep('connection', 'components', 'Link'),
});

export default connect(mapStateToProps)(TagItem);

const Container = styled.span`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
  box-shadow: 1px 1px 1px 0 ${({ theme }) => theme.shadowColor};
`;

const A = styled.a`
  white-space: nowrap;
  font-size: 0.9rem;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
`;
