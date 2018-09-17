import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import IconShare from '../../../shared/components/Icons/Share';
import ShareButton from '../ShareButton';

const ListItemShareButton = ({ type, id, itemType }) => (
  <ShareButton type={type} id={id} component="List">
    <Container itemType={itemType}>
      <IconShare size={27} />
    </Container>
  </ShareButton>
);

ListItemShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  itemType: PropTypes.string,
};

ListItemShareButton.defaultProps = {
  itemType: 'normal',
};

export default ListItemShareButton;

const itemTypeStyles = itemType => {
  if (itemType === 'normal' || itemType === 'alternative') {
    return css`
      top: 15px;
      right: 15px;
      border-top-right-radius: 4px;
    `;
  }

  return css`
    top: 0;
    right: 0;
  `;
};

const Container = styled.div`
  position: absolute;
  ${({ itemType }) => itemTypeStyles(itemType)};
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom-left-radius: 4px;
`;
