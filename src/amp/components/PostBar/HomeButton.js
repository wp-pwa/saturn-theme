/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import IconHome from 'react-icons/lib/md/home';
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

export default inject(({ stores: { settings } }) => ({
  siteUrl: settings.generalSite.url,
}))(HomeButton);

const Hyperlink = styled.a`
  color: inherit;
`;
