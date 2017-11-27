import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import * as selectors from '../../selectors';
import ShareItem from './ShareItem';
import ShareButton from './ShareButton';
import ShareLink from './ShareLink';
import ShareEmail from './ShareEmail';

const ShareList = ({ title, link }) => {
  const networks = [
    {
      El: ShareLink,
      type: 'copy',
      buttonText: 'Copiar link',
      buttonTextOnClick: 'Copiado',
    },
    {
      El: ShareButton,
      type: 'facebook',
      countText: 'Compartidos',
      buttonText: 'Compartir',
    },
    {
      El: ShareButton,
      type: 'twitter',
      buttonText: 'Tuitear',
    },
    {
      El: ShareButton,
      type: 'whatsapp',
      buttonText: 'Compartir',
    },
    {
      El: ShareButton,
      type: 'telegram',
      buttonText: 'Compartir',
    },
    {
      El: ShareButton,
      type: 'linkedin',
      countText: 'Compartidos',
      buttonText: 'Compartir',
    },
    {
      El: ShareButton,
      type: 'google',
      countText: 'Compartidos',
      buttonText: 'Compartir',
    },
    {
      El: ShareEmail,
      type: 'email',
      buttonText: 'Enviar',
    },
  ];

  return (
    <Container>
      {networks.map(({ El, type, countText, buttonText, buttonTextOnClick }) => (
        <ShareItem
          key={type}
          El={El}
          title={title}
          link={link}
          type={type}
          countText={countText}
          buttonText={buttonText}
          buttonTextOnClick={buttonTextOnClick}
        />
      ))}
    </Container>
  );
};

ShareList.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  id: selectors.shareModal.getId(state),
});

export default connect(mapStateToProps)(
  inject((stores, { id }) => ({
    title: stores.connection.single.post[id].title,
    link: stores.connection.single.post[id].link,
  }))(ShareList),
);

const Container = styled.ul`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 5px 15px;
`;
