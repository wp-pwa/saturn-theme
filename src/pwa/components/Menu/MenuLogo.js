import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import { Container, InnerContainer, Title } from '../../../shared/styled/Menu/MenuLogo';

const MenuLogo = ({ title, logoUrl }) => {
  const widths = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];
  const sizes = widths.map(width => `(max-width: ${width}px) ${width}px`).join(', ');
  const srcset = widths.map(width => `${logoUrl}?scale.width=${width}px ${width}w`).join(', ');

  return (
    <Container>
      <InnerContainer>
        {logoUrl ? (
          <img alt={title} src={logoUrl} sizes={sizes} srcSet={srcset} />
        ) : (
          <Title>{title}</Title>
        )}
      </InnerContainer>
    </Container>
  );
};

MenuLogo.propTypes = {
  title: PropTypes.string.isRequired,
  logoUrl: PropTypes.string
};

MenuLogo.defaultProps = {
  logoUrl: null
};

const mapStateToProps = state => ({
  title: dep('settings', 'selectorCreators', 'getSetting')('generalApp', 'title')(state),
  logoUrl: dep('settings', 'selectorCreators', 'getSetting')('theme', 'logoUrl')(state)
});

export default connect(mapStateToProps)(MenuLogo);
