import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import { goHome } from '../../analytics/classes';

const Logo = ({ title, logoUrl, siteUrl }) => {
  const widths = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];
  const srcset = widths.map(width => `${logoUrl}?scale.width=${width}px ${width}w`).join(', ');

  return (
    <Container>
      <a className={goHome} href={siteUrl}>
        {logoUrl ? (
          <amp-img alt={title} src={logoUrl} srcSet={srcset} layout="fill" />
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
  siteUrl: PropTypes.string.isRequired,
};

Logo.defaultProps = {
  logoUrl: null,
};

export default inject(({ stores: { settings } }) => ({
  title: settings.generalApp.title,
  logoUrl: settings.theme.logoUrl,
  siteUrl: settings.generalSite.url,
}))(Logo);

const Container = styled.div`
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: normal;
  margin: 0;
  width: ${({ theme }) => `calc(100vw - (2 * ${theme.heights.bar}))`};
  height: ${({ theme }) => theme.heights.bar};
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    max-width: 100%;
    width: inherit;
    height: inherit;
    text-decoration: none;
    white-space: nowrap;
    font-size: ${({ theme }) => theme.logoFontSize};
    color: ${({ theme }) => theme.colors.text};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  amp-img {
    height: 40px;
    top: 7px;
  }

  img {
    object-fit: contain;
    object-position: center;
    background-color: transparent;
    color: transparent;
    border: none;
  }
`;

const Title = styled.span`
  height: 100%;
  width: auto;
  overflow: hidden;
  font-size: inherit;
  line-height: ${({ theme }) => theme.heights.bar};
`;
