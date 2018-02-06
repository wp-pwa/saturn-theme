/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconHome from 'react-icons/lib/md/home';
import { dep } from 'worona-deps';
import styled from 'react-emotion';
import { Container } from '../../../shared/styled/PostBar/CloseButton';

const HomeButton = ({ siteUrl }) => (
  <Hyperlink href={siteUrl}>
    <Container>
      <IconHome size={33} verticalAlign="none" />
    </Container>
  </Hyperlink>
);

HomeButton.propTypes = {
  siteUrl: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  siteUrl: dep('settings', 'selectorCreators', 'getSetting')('generalSite', 'url')(state),
});

export default connect(mapStateToProps)(HomeButton);

const Hyperlink = styled.a`
  color: inherit;
`;
