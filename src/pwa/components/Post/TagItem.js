import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { home } from '../../contexts';

const TagItem = ({ name, Link, selected, context }) => (
  <Container>
    <Link selected={selected} context={context}>
      <A>{name}</A>
    </Link>
  </Container>
);

TagItem.propTypes = {
  name: PropTypes.string.isRequired,
  Link: PropTypes.func.isRequired,
  selected: PropTypes.shape().isRequired,
  context: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  menu: dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state),
  Link: dep('connection', 'components', 'Link'),
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { id, type, menu }) => ({
    name: connection.single[type][id].name,
    selected: { listType: type, listId: id },
    context: home(menu),
  })),
)(TagItem);

const Container = styled.span`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 1px 1px 1px 0 ${({ theme }) => theme.colors.shadow};
`;

const A = styled.a`
  white-space: nowrap;
  font-size: 0.9rem;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
`;
