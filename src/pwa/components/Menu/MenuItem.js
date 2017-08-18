import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import * as actions from '../../actions';

const MenuItem = ({ Link, label, type, id, active, url, menuHasClosed }) => {
  if (type === 'link') {
    return (
      <A
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          menuHasClosed();
        }}
      >
        {label}
      </A>
    );
  }

  return (
    <Link type={type} id={id} onClick={() => menuHasClosed()}>
      <A isActive={active} onClick={() => menuHasClosed()}>
        {label}
      </A>
    </Link>
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

const A = styled.a`
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  padding: 10px;
  padding-left: ${({ theme }) => theme.menuPaddingLeft};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  color: ${({ isActive }) => (isActive ? '#333' : '#999')} !important;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  border-left: 3px solid ${({ isActive }) => (isActive ? '#333' : 'transparent')};
  text-decoration: none;
  color: #333;
`;
