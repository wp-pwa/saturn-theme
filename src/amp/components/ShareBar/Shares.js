import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { inject } from 'mobx-react';
import FacebookShare from './FacebookShare';

const Shares = ({ link, title }) => (
  <Container>
    <FacebookShare u={link} title={title} />
    <amp-social-share
      type="twitter"
      height="42"
      width="42"
      data-param-text={title}
      data-param-url={link}
    />
    <amp-social-share
      type="whatsapp"
      height="42"
      width="42"
      data-param-text={`${title} - ${link}`}
    />
    <amp-social-share
      type="email"
      height="42"
      width="42"
      data-param-subject={title}
      data-param-body={link}
    />
    <amp-social-share
      type="system"
      height="42"
      width="42"
      data-param-text={title}
    />
  </Container>
);

Shares.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default inject(({ stores: { connection } }) => ({
  title: connection.selectedItem.entity.title,
  link: connection.selectedItem.entity.link,
}))(Shares);

const Container = styled.div`
  box-sizing: border-box;
  width: calc(100vw - 130px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: ${({ theme }) => theme.heights.bar};

  & > * {
    width: 42px;
    height: 42px;
    flex-shrink: 0;
    border-radius: 50%;
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
