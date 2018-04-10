import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import { Container } from '../../../shared/styled/Menu/MenuItem';
import * as actions from '../../actions';

const MenuItem = ({ type, id, context, label, isSelected, url, Link, menuHasClosed }) => {
  if (type === 'link') {
    return (
      <Container onClick={menuHasClosed}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      </Container>
    );
  }

  const item = {
    type,
    id,
  };

  if (['latest', 'author', 'tag', 'category'].includes(type)) item.page = 1;

  return (
    <Container isSelected={isSelected} onClick={menuHasClosed}>
      <Link
        item={item}
        context={context}
        event={{
          category: 'Menu',
          action: ['page', 'post'].includes(type) ? 'open single' : 'open list',
        }}
      >
        <a>{label}</a>
      </Link>
    </Container>
  );
};

MenuItem.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  url: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  context: PropTypes.shape({}),
  Link: PropTypes.func.isRequired,
  menuHasClosed: PropTypes.func.isRequired,
};

MenuItem.defaultProps = {
  url: null,
  context: null,
};

const mapDispatchToProps = dispatch => ({
  menuHasClosed: () => dispatch(actions.menu.hasClosed()),
});

export default compose(
  connect(null, mapDispatchToProps),
  inject(({ connection }, { type, id }) => ({
    Link: dep('connection', 'components', 'Link'),
    isSelected: connection.selectedItem.type === type && connection.selectedItem.id === id,
  })),
)(MenuItem);
