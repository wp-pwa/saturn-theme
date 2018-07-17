/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Image from '../Image';
import Link from '../../../pwa/components/Link';

const Item = ({ id, context }) => (
  <Container className="gallery">
    <Link
      type="media"
      id={id}
      context={context}
      eventCategory="Post"
      eventAction="open gallery media"
    >
      <a>
        <Image lazy offsetHorizonal={30} id={id} width="40vmin" height="100%" />
      </a>
    </Link>
  </Container>
);

Item.propTypes = {
  context: PropTypes.shape({}).isRequired,
  id: PropTypes.number.isRequired,
};

export default Item;

const Container = styled.li`
  box-sizing: border-box;
  width: 40vmin;
  height: 100%;
  margin-right: 1.5vmin;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;

  &:last-child {
    margin-right: 0;
  }
`;
