/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import ShareLink from './ShareLink';
// import SharePinterest from './SharePinterest';
import ShareButton from './ShareButton';

const networks = ['facebook', 'twitter', 'whatsapp', 'telegram', 'linkedin', 'googlePlus', 'email'];

const ShareList = ({ url, title, media }) => (
  <Container>
    <ShareLink url={url} title={title} />
    {networks.map(net => <ShareButton key={net} network={net} url={url} title={title} />)}
    {/* {media && <SharePinterest url={url} description={title} media={media} />} */}
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

export default inject(({ connection, theme }) => {
  const { type, id } = theme.shareModal.item;
  const entity = connection.entity(type, id);

  return {
    title: entity.title,
    url: entity.link,
    media: type === 'media' ? entity.original.url : entity.media.featured.original.url,
  };
})(ShareList);

const Container = styled.ul`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 5px 15px;
`;
