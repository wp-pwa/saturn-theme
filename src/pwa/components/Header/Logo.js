import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';

const Logo = ({ title }) =>
  <Container>
    <StyledLink to="">
      {title}
    </StyledLink>
  </Container>;

Logo.propTypes = {
  title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  title: dep('settings', 'selectorCreators', 'getSetting')('generalApp', 'title')(state),
});

export default connect(mapStateToProps)(Logo);

const Container = styled.div`
  box-sizing: border-box;
  width: calc(100% - (2 * ${({ theme }) => theme.titleSize}));
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(dep('router', 'components', 'Link'))`
  text-decoration: none;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.logoSize};
  color: inherit !important;
`;
