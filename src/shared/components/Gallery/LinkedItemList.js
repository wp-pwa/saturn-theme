import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import LinkedItem from './LinkedItem';

const LinkedItemList = ({ ready, mediaIds }) => {
  const context = {
    items: mediaIds.map(id => ({ singleType: 'media', singleId: id })),
    infinite: false,
    options: {
      bar: 'picture',
    },
  };

  const items = mediaIds.map(id => <LinkedItem key={id} id={id} context={context} />);

  return (
    <Container>
      <InnerContainer>{(ready && <List>{items}</List>) || null}</InnerContainer>
    </Container>
  );
};

LinkedItemList.propTypes = {
  mediaIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  ready: PropTypes.bool.isRequired,
};

export default inject((stores, { ssr, name }) => ({
    ready: !ssr && stores.connection.custom[name].ready,
  }))(LinkedItemList);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 1.5vmin 0;
  margin-bottom: 30px;
  background: #0e0e0e;
`;

const InnerContainer = styled.div`
  height: 40vmin;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.ul`
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: stretch;
  list-style: none;
  margin: 0 !important;
  padding: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
