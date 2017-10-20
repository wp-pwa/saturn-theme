import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import styled from 'styled-components';

const NavItem = ({ Link, label, type, id, active, url }) => {
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
    <Container active={active}>
      <Link type={type} id={id}>
        <a>{active ? <h1>{label}</h1> : label}</a>
      </Link>
    </Container>
  );
};

NavItem.propTypes = {
  Link: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
  id: PropTypes.number,
  active: PropTypes.bool.isRequired,
};

const mapStateToProps = () => ({
  Link: dep('connection', 'components', 'Link'),
});

export default connect(mapStateToProps)(NavItem);

const Container = styled.li`
  box-sizing: border-box;
  flex-shrink: 0;
  height: 100%;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid
    ${({ theme, active }) => (active ? theme.color : 'rgba(153, 153, 153, 0)')};

  a {
    color: ${({ theme }) => theme.color} !important;
    font-weight: 400;
    font-size: 0.9rem;
    padding: 0 17px;
    text-decoration: none;
    text-transform: uppercase;
    height: 100%;
    display: flex;
    align-items: center;
    opacity: inherit !important;
  }

  h1 {
    font-size: inherit;
    margin: inherit;
    line-height: inherit;
    font-weight: inherit;
  }
`;
