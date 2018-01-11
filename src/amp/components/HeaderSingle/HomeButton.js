/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconHome from 'react-icons/lib/md/home';
import { dep } from 'worona-deps';
import { Container } from '../../../shared/styled/HeaderSingle/CloseButton';

const HomeButton = ({ siteUrl }) => (
  <a href={siteUrl}>
    <Container>
      <IconHome size={33} verticalAlign='none' />
    </Container>
  </a>
);

HomeButton.propTypes = {
  siteUrl: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  siteUrl: dep('settings', 'selectorCreators', 'getSetting')('generalSite', 'url')(state)
});

export default connect(mapStateToProps)(HomeButton);
