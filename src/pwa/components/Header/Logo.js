import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';

const Logo = ({ Link, title, logoUrl }) => (
  <Container>
    <Link type="latest">
      <a>
        {logoUrl ? (
          <img alt={title} src={`${logoUrl}?scale.height=36px`} />
        ) : (
          <Title>{title}</Title>
        )}
      </a>
    </Link>
  </Container>
);

Logo.propTypes = {
  Link: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  Link: dep('connection', 'components', 'Link'),
  title: dep('settings', 'selectorCreators', 'getSetting')('generalApp', 'title')(state),
  logoUrl: dep('settings', 'selectorCreators', 'getSetting')('theme', 'logoUrl')(state) || '',
});

export default connect(mapStateToProps)(Logo);

const Container = styled.div`
  box-sizing: border-box;
  width: calc(100vw - (2 * ${({ theme }) => theme.titleSize}));
  height: 100%;

  a {
    height: 100%;
    width: 100%;
    text-decoration: none;
    white-space: nowrap;
    font-size: ${({ theme }) => theme.logoSize};
    color: inherit !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.span`
  height: 100%;
  overflow: hidden;
  font-size: inherit;
  display: flex;
  align-items: center;
`;
