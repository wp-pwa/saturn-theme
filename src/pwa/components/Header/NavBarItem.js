import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import styled from 'styled-components';

class NavBarItem extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.active !== this.props.active;
  }

  render() {
    const { Link, label, type, id, active, url } = this.props;

    return (
      <ListItem active={active} className={active ? 'active' : ''}>
        {type === 'link'
          ? <A href={url} target="_blank" rel="noopener noreferrer">
              {label}
            </A>
          : <Link type={type} id={id}>
              <A>
                {label}
              </A>
            </Link>}
      </ListItem>
    );
  }
}

NavBarItem.propTypes = {
  Link: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
  id: PropTypes.number,
  active: PropTypes.bool.isRequired
};

const mapStateToProps = () => ({
  Link: dep('connection', 'components', 'Link')
});

export default connect(mapStateToProps)(NavBarItem);

const ListItem = styled.li`
  box-sizing: border-box;
  flex-shrink: 0;
  height: 100%;
  background-color: ${({ theme }) => theme.bgColor};
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid
    ${({ theme, active }) => (active ? theme.color : 'rgba(153, 153, 153, 0)')};
`;

const A = styled.a`
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
`;
