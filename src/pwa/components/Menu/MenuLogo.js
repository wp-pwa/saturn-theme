import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';

const MenuLogo = ({ title, logoUrl }) => (
  <Container>
    <InnerContainer>
      {logoUrl ? <img alt={title} src={`${logoUrl}?scale.height=36px`} /> : <Title>{title}</Title>}
    </InnerContainer>
  </Container>
);

MenuLogo.propTypes = {
  title: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  title: dep('settings', 'selectorCreators', 'getSetting')('generalApp', 'title')(state),
  logoUrl: dep('settings', 'selectorCreators', 'getSetting')('theme', 'logoUrl')(state) || '',
});

export default connect(mapStateToProps)(MenuLogo);

const Container = styled.div`
  box-sizing: border-box;
  width: calc(100% - ${({ theme }) => theme.titleSize} - 20px);
  height: 100%;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 100%;
  margin: 0;
  text-decoration: none;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.logoSize};
  font-weight: normal;
  color: inherit !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  height: 100%;
  font-size: inherit;
  overflow: hidden;
`;
