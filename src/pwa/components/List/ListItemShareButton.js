import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import IconShare from 'react-icons/lib/md/share';
import ShareButton from '../ShareButton';

const ListItemShareButton = ({ type, id }) => (
  <ShareButton type={type} id={id}>
    <Container>
      <IconShare size={27} />
    </Container>
  </ShareButton>
);

ListItemShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default ListItemShareButton;

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom-left-radius: 30%;
`;
