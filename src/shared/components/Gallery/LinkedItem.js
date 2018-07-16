/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Image from '../Image';
import SizeTag from './SizeTag';
import Link from '../../../pwa/components/Link';

const Item = ({ id, context, first, length }) => (
  <Container className="gallery">
    <Link
      type="media"
      id={id}
      context={context}
      eventCategory="Post"
      eventAction="open media"
    >
      <a>
        <Image lazy offsetHorizonal={30} id={id} width="100%" height="100%" />
      </a>
    </Link>
    {first && <SizeTag length={length} />}
  </Container>
);

Item.propTypes = {
  context: PropTypes.shape({}).isRequired,
  id: PropTypes.number.isRequired,
  first: PropTypes.bool.isRequired,
  length: PropTypes.number.isRequired,
};

export default Item;

const Container = styled.li`
  box-sizing: border-box;
  position: relative;
  width: 290px;
  height: 250px;
  margin-right: 8px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  &:last-child {
    margin-right: 0;
  }
`;
