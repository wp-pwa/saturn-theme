import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import { dep } from 'worona-deps';

const context = selected => ({
  items: [ selected ],
  infinite: true,
  options: {
    bar: 'list',
  },
});

const TagItem = ({ name, Link, selected }) => (
  <Container>
    <Link selected={selected} context={context(selected)}>
      <A>{name}</A>
    </Link>
  </Container>
);

TagItem.propTypes = {
  name: PropTypes.string.isRequired,
  Link: PropTypes.func.isRequired,
  selected: PropTypes.shape().isRequired,
};

export default inject(({ connection }, { id, type }) => ({
  name: connection.single[type][id].name,
  Link: dep('connection', 'components', 'Link'),
  selected: { listType: type, listId: id }
}))(TagItem);

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
