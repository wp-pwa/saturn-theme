import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import { home } from '../../contexts';
import { Container } from '../../../shared/styled/ListBar/NavItem';

const NavItem = ({ label, type, active, url, Link, selected, context }) => {
  if (type === 'link') {
    return (
      <Container>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      </Container>
    );
  }

  return (
    <Container isActive={active}>
      <Link
        selected={selected}
        context={context}
        event={{
          category: 'Navbar',
          action: ['page', 'post'].includes(type) ? 'open single' : 'open list',
        }}
      >
        <a>{active ? <h1>{label}</h1> : label}</a>
      </Link>
    </Container>
  );
};

NavItem.propTypes = {
  Link: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  selected: PropTypes.shape({}),
  url: PropTypes.string,
  active: PropTypes.bool.isRequired,
  context: PropTypes.shape({}).isRequired,
};

NavItem.defaultProps = {
  url: null,
  selected: null,
};

const mapStateToProps = (state, { id, type }) => {
  const selected = {};

  if (type !== 'link') {
    if (['latest', 'author', 'tag', 'category'].includes(type)) {
      selected.listType = type;
      selected.listId = id;
    } else {
      selected.singleType = type;
      selected.singleId = id;
    }
  }

  const menu = dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state);

  return {
    Link: dep('connection', 'components', 'Link'),
    context: home(menu),
    selected,
  };
};

export default connect(mapStateToProps)(NavItem);
