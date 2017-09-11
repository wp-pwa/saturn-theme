import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import * as actions from '../../actions';

const MenuItem = ({ Link, label, type, id, active, url, menuHasClosed }) => {
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
      <Link type={type} id={id}>
        <a>
          {label}
        </a>
      </Link>
    </Container>
  );
};

MenuItem.propTypes = {
  Link: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
  id: PropTypes.number,
  active: PropTypes.bool.isRequired,
  menuHasClosed: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  Link: dep('connection', 'components', 'Link')
});

const mapDispatchToProps = dispatch => ({
  menuHasClosed: () => dispatch(actions.menu.hasClosed())
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);

const Container = styled.li`
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  width: 100%;
  border-left: 3px solid ${({ isActive }) => (isActive ? '#333' : 'transparent')};

  a {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: ${({ isActive }) => (isActive ? '#333' : '#999')} !important;
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    padding-left: ${({ theme }) => theme.menuPaddingLeft};
    height: 100%;
    width: 100%;
    font-size: 0.9rem;
    text-decoration: none;
  }
`;
