import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';
import { selectorCreators } from '../../deps';

const Logo = ({ title }) =>
  <Container>
    <StyledLink to="">
      {title}
    </StyledLink>
  </Container>;

const Container = styled.div`
  box-sizing: border-box;
  width: calc(100% - (2 * ${props => props.theme.titleSize}));
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  white-space: nowrap;
  font-size: ${props => props.theme.logoSize};
  color: inherit !important;
  z-index: 1;
`;

Logo.propTypes = {
  title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  title: selectorCreators.getSetting('generalApp', 'title')(state),
});

export default connect(mapStateToProps)(Logo);
