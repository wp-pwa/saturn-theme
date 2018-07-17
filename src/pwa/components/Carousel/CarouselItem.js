/* eslint-disable react/no-danger, jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Link from '../Link';
import Image from '../../../shared/components/Image';

const CarouselItem = ({ item, context, media, title }) => (
  <Container>
    <Link
      type={item.type}
      id={item.id}
      page={item.page}
      context={context}
      eventCategory="Post"
      eventAction="open single"
    >
      <a>
        <Image
          lazy
          offsetHorizonal={30}
          id={media}
          width="100%"
          height="125px"
        />
        <InnerContainer>
          <Title>
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </Title>
        </InnerContainer>
      </a>
    </Link>
  </Container>
);

CarouselItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}),
  media: PropTypes.number,
  title: PropTypes.string.isRequired,
};

CarouselItem.defaultProps = {
  context: null,
  media: null,
};

export default CarouselItem;

const Container = styled.li`
  box-sizing: border-box;
  width: 200px;
  height: 220px;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  flex-shrink: 0;
  margin-right: 8px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #e2e7ee;
`;

const InnerContainer = styled.div`
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
`;

const Title = styled.div`
  font-size: 1rem
  font-weight: 500;
  line-height: 1.25rem;
  margin: 0.5rem auto;
  width: 90%;
  color: #312f3c;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
