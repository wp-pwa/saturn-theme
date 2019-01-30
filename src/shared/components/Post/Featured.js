/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import SharedCount from './SharedCount';
import ReadingTime from './ReadingTime';

const Featured = ({
  type,
  id,
  sharedCountPosition,
  readingTimePosition,
  children,
}) =>
  children && children.length !== 0 ? (
    <Container>
      {children}
      {(sharedCountPosition === 'featured-image' ||
        readingTimePosition === 'featured-image') && (
        <InnerContainer>
          {sharedCountPosition === 'featured-image' && (
            <SharedCount type={type} id={id} />
          )}
          {readingTimePosition === 'featured-image' && (
            <ReadingTime type={type} id={id} />
          )}
        </InnerContainer>
      )}
    </Container>
  ) : null;

Featured.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  sharedCountPosition: PropTypes.string,
  readingTimePosition: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Featured.defaultProps = {
  sharedCountPosition: 'header',
  readingTimePosition: 'header',
};

export default inject(({ stores: { settings } }) => {
  const sharedCount = settings.theme.sharedCount || {};
  const readingTime = settings.theme.readingTime || {};

  return {
    sharedCountPosition: sharedCount.position,
    readingTimePosition: readingTime.position,
  };
})(Featured);

const Container = styled.div`
  position: relative;
`;

const InnerContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.4);
  color: ${({ theme }) => theme.colors.white};
  height: 36px;
`;
