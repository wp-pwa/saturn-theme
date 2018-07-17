import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import LinkedItem from './LinkedItem';

const LinkedItemList = ({ mediaIds, context }) => (
  <Container>
    <List length={mediaIds.length}>
      {mediaIds.map((id, index) => (
        <LinkedItem
          key={id}
          id={id}
          context={context}
          first={index === 0}
          length={mediaIds.length}
        />
      ))}
    </List>
  </Container>
);

LinkedItemList.propTypes = {
  mediaIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  context: PropTypes.shape({}).isRequired,
};

export default LinkedItemList;

const Container = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.ul`
  height: 100%;
  width: calc(
    16px + 8px + (290px * ${({ length }) => length}) +
      (8px * ${({ length }) => length})
  );
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: stretch;
  list-style: none;
  margin: 0 !important;
  padding: 0 16px;
`;
