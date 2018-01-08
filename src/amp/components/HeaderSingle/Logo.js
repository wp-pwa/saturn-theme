import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';

const Logo = ({ title, logoUrl, siteUrl }) => {
  const widths = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];
  const srcset = widths.map(width => `${logoUrl}?scale.width=${width}px ${width}w`).join(', ');

  return (
    <Container>
      <a href={siteUrl}>
        {logoUrl ? (
          <amp-img
            alt={title}
            src={logoUrl}
            height={1}
            width={1}
            srcSet={srcset}
            layout="responsive"
          />
        ) : (
          <Title>{title}</Title>
        )}
      </a>
    </Container>
  );
};

Logo.propTypes = {
  title: PropTypes.string.isRequired,
  logoUrl: PropTypes.string,
  siteUrl: PropTypes.string.isRequired
};

Logo.defaultProps = {
  logoUrl: null
};

const mapStateToProps = state => ({
  title: dep('settings', 'selectorCreators', 'getSetting')('generalApp', 'title')(state),
  logoUrl: dep('settings', 'selectorCreators', 'getSetting')('theme', 'logoUrl')(state),
  siteUrl: dep('settings', 'selectorCreators', 'getSetting')('generalSite', 'url')(state)
});

export default connect(mapStateToProps)(Logo);

const Container = styled.div`
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: normal;
  margin: 0;
  width: ${({ theme }) => `calc(100vw - (2 * ${theme.heights.bar}))`};
  height: 100%;

  a {
    height: 100%;
    width: 100%;
    text-decoration: none;
    white-space: nowrap;
    font-size: ${({ theme }) => theme.logoFontSize};
    color: inherit !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  amp-img {
    height: 40px;
    object-fit: contain;
    object-position: center;
  }
`;

const Title = styled.span`
  height: 100%;
  overflow: hidden;
  font-size: inherit;
  display: flex;
  align-items: center;
`;
