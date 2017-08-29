import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';

const Logo = ({ Link, title }) =>
  <Container>
    <Link type="latest">
      <a>
        {title}
      </a>
    </Link>
  </Container>;

Logo.propTypes = {
  Link: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  Link: dep('connection', 'components', 'Link'),
  title: dep('settings', 'selectorCreators', 'getSetting')('generalApp', 'title')(state)
});

export default connect(mapStateToProps)(Logo);

const Container = styled.div`
  box-sizing: border-box;
  width: calc(100% - (2 * ${({ theme }) => theme.titleSize}));
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
    white-space: nowrap;
    font-size: ${({ theme }) => theme.logoSize};
    color: inherit !important;
  }
`;
