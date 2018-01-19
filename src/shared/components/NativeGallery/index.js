import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Item from './Item';

const NativeGallery = ({ imgAttributes }) => {
  const items = imgAttributes.map(({ alt, sizes, src, srcset }) => (
    <Item key={src} alt={alt} sizes={sizes} src={src} srcset={srcset} />
  ));

  return (
    <Container>
      <InnerContainer>
        <List>{items}</List>
      </InnerContainer>
    </Container>
  );
};

NativeGallery.propTypes = {
  imgAttributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default NativeGallery;

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
  width: 100%;
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
