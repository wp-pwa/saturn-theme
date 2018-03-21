import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import FacebookShare from './FacebookShare';

const Shares = ({ link, title }) => (
  <Container>
    <FacebookShare className="facebook-share" u={link} title={title} />
    <amp-social-share
      type="twitter"
      height="56"
      width="56"
      data-param-text={title}
      data-param-url={link}
    />
    <amp-social-share
      type="whatsapp"
      height="56"
      width="56"
      data-param-text={`${title} - ${link}`}
    />
    <amp-social-share
      type="email"
      height="56"
      width="56"
      data-param-subject={title}
      data-param-body={link}
    />
    <amp-social-share
      type="system"
      height="56"
      width="56"
      data-param-text={title}
    />
  </Container>
);

Shares.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
};

Shares.defaultProps = {
  title: null,
  link: null,
};

export default Shares;

const Container = styled.div`
  box-sizing: border-box;
  width: calc(100vw - 130px);
  display: flex;
  height: ${({ theme }) => theme.heights.bar};
  flex-grow: 1;

  & > * {
    flex-grow: 1;
  }

  amp-social-share {
    height: ${({ theme }) => theme.heights.bar};
  }

  amp-social-share:focus {
    outline: none;
  }

  amp-social-share[type='facebook'] {
    background-size: 35px 35px;
  }

  amp-social-share[type='twitter'] {
    background-size: 32px 32px;
  }

  amp-social-share[type='whatsapp'] {
    background-size: 28px 28px;
  }

  amp-social-share[type='email'] {
    background-color: ${({ theme }) => theme.colors.email};
    background-size: 45px 45px;
  }

  amp-social-share[type='system'] {
    background-color: ${({ theme }) => theme.colors.share};
    background-size: 28px 28px;
  }
`;
