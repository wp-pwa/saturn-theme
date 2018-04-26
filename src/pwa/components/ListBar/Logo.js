import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import { home } from '../../contexts';

const Logo = ({ title, logoUrl, Link, context }) => {
  const widths = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];
  const sizes = widths.map(width => `(max-width: ${width}px) ${width}px`).join(', ');
  const srcset = widths.map(width => `${logoUrl}?scale.width=${width}px ${width}w`).join(', ');

  return (
    <Container>
      <Link
        type="latest"
        id="post"
        page={1}
        context={context}
        eventCategory="List bar"
        eventAction="go home"
      >
        <a>
          {logoUrl ? (
            <Image alt={title} src={logoUrl} sizes={sizes} srcSet={srcset} />
          ) : (
            <Title>{title}</Title>
          )}
        </a>
      </Link>
    </Container>
  );
};

Logo.propTypes = {
  Link: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
  context: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => {
  const menu = dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state);

  return {
    Link: dep('connection', 'components', 'Link'),
    title: dep('settings', 'selectorCreators', 'getSetting')('generalApp', 'title')(state),
    logoUrl: dep('settings', 'selectorCreators', 'getSetting')('theme', 'logoUrl')(state) || '',
    context: home(menu),
  };
};

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
`;

const Image = styled.img`
  height: 40px;
  max-width: 80%;
  object-fit: contain;
  object-position: center;
`;

const Title = styled.span`
  height: 100%;
  overflow: hidden;
  font-size: inherit;
  display: flex;
  align-items: center;
`;
