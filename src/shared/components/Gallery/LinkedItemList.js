import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import LinkedItem from './LinkedItem';

const LinkedItemList = ({ mediaIds, context }) => (
  <InnerContainer>
    <List>
      {mediaIds.map(id => <LinkedItem key={id} id={id} context={context} />)}
    </List>
  </InnerContainer>
);

LinkedItemList.propTypes = {
  mediaIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  context: PropTypes.shape({}).isRequired,
};

export default LinkedItemList;

const InnerContainer = styled.div`
  height: 100%;
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
