/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import * as selectors from '../../selectors';
import ShareLink from './ShareLink';
import SharePinterest from './SharePinterest';
import ShareButton from './ShareButton';

const networks = [
  'copy',
  'facebook',
  'twitter',
  'whatsapp',
  'pinterest',
  'telegram',
  'linkedin',
  'google',
  'email',
];

const ShareList = ({ url, title, media }) => (
  <Container>
    {networks.map(network => {
      if (network === 'copy') {
        return (
          <InnerContainer key={network}>
            <ShareLink url={url} title={title} />
          </InnerContainer>
        );
      }

      if (network === 'pinterest') {
        if (!media) return null;

        return (
          <InnerContainer key={network}>
            <SharePinterest url={url} description={title} media={media} />
          </InnerContainer>
        );
      }

      return (
        <InnerContainer key={network}>
          <ShareButton type={network} url={url} title={title} />
        </InnerContainer>
      );
    })}
  </Container>
);

ShareList.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  media: PropTypes.string,
};

ShareList.defaultProps = {
  media: null,
};

const mapStateToProps = state => ({
  id: selectors.share.getId(state),
  type: selectors.share.getWpType(state),
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { id, type }) => ({
    title: connection.entity(type, id).title,
    url: connection.entity(type, id).link,
    media:
      type === 'media'
        ? connection.entity(type, id).original.url
        : connection.entity(type, id).media.featured.original.url,
  })),
)(ShareList);

const Container = styled.ul`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 5px 15px;
`;

const InnerContainer = styled.li`
  box-sizing: border-box;
  width: 100%;
  max-height: 61px;
  list-style: none;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;
