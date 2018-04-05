import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import { Container } from '../../../shared/styled/Menu/MenuItem';
import * as actions from '../../actions';
import { home } from '../../contexts';

const MenuItem = ({ id, type, context, label, selected, url, Link, menuHasClosed }) => {
  if (type === 'link') {
    return (
      <Container onClick={menuHasClosed}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      </Container>
    );
  }

  const item = {};

  if (type !== 'link') {
    item.type = type;
    item.id = id;

    if (['latest', 'author', 'tag', 'category'].includes(type)) {
      item.page = 1;
    }
  }

  return (
    <Container isSelected={selected} onClick={menuHasClosed}>
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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  url: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  context: PropTypes.shape({}),
  Link: PropTypes.func.isRequired,
  menuHasClosed: PropTypes.func.isRequired,
};

MenuItem.defaultProps = {
  url: null,
  context: null,
};

const mapStateToProps = state => {
  const menu = dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state);

  return {
    context: home(menu),
    Link: dep('connection', 'components', 'Link'),
  };
};

const mapDispatchToProps = dispatch => ({
  menuHasClosed: () => dispatch(actions.menu.hasClosed()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  inject(({ connection }, { type, id, page = 1 }) => {
    const item = connection.selectedContext.getItem({ item: { type, id, page } });

    return {
      selected: !!item && item.isSelected,
    };
  }),
)(MenuItem);
