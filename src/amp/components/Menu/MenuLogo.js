import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import {
  Container,
  InnerContainer,
  Title,
} from '../../../shared/styled/Menu/MenuLogo';

const MenuLogo = ({ title, logoUrl }) => {
  const widths = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];
  const srcset = widths
    .map(width => `${logoUrl}?scale.width=${width}px ${width}w`)
    .join(', ');

  return (
    <Container>
      <InnerContainer>
        {logoUrl ? (
          <amp-img alt={title} src={logoUrl} srcSet={srcset} layout="fill" />
        ) : (
          <Title>{title}</Title>
        )}
      </InnerContainer>
    </Container>
  );
};

MenuLogo.propTypes = {
  title: PropTypes.string.isRequired,
  logoUrl: PropTypes.string,
};

MenuLogo.defaultProps = {
  logoUrl: null,
};

export default inject(({ stores: { settings } }) => ({
  title: settings.theme.title,
  logoUrl: settings.theme.logoUrl,
}))(MenuLogo);
