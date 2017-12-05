/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import styled from 'react-emotion';
import * as actions from '../../actions';

class MenuItem extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string,
    active: PropTypes.bool.isRequired,
    selected: PropTypes.shape({}),
    Link: PropTypes.func.isRequired,
    menuHasClosed: PropTypes.func.isRequired,
  };

  static defaultProps = {
    url: null,
    selected: null,
  };

  render() {
    const {
      type,
      selected,
      label,
      active,
      url,
      Link,
      menuHasClosed,
    } = this.props;

    if (type === 'link') {
      return (
        <Container onClick={menuHasClosed}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        </Container>
      );
    }

    return (
      <Container isActive={active}>
        <Link selected={selected}>
          <a>{label}</a>
        </Link>
      </Container>
    );
  }
}

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

  return {
    Link: dep('connection', 'components', 'Link'),
    selected,
  };
};

const mapDispatchToProps = dispatch => ({
  menuHasClosed: () => dispatch(actions.menu.hasClosed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);

const Container = styled.li`
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  width: 100%;
  border-left: ${({ isActive }) =>
    isActive ? '3px solid #333' : '3px solid transparent'};

  a {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: ${({ isActive }) => (isActive ? '#333' : '#999')};
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    padding-left: ${({ theme }) => theme.menuPaddingLeft};
    padding-right: 10px;
    height: 100%;
    width: 100%;
    font-size: 0.9rem;
    text-decoration: none;
  }
`;
