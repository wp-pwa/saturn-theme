/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Media from '../../../shared/components/Media';

const CarouselItem = ({ selected, context, media, title, Link }) => (
  <Container>
    <Link selected={selected} context={context} event={{ category: 'Post', action: 'open single' }}>
      <a>
        <Media lazy offsetHorizonal={30} id={media} width="60vw" height="100%" />
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
  selected: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}),
  media: PropTypes.number,
  title: PropTypes.string.isRequired,
  Link: PropTypes.func.isRequired,
};

CarouselItem.defaultProps = {
  context: null,
  media: null,
};

const mapStateToProps = () => ({
  Link: dep('connection', 'components', 'Link'),
});

export default connect(mapStateToProps)(CarouselItem);

const Container = styled.li`
  box-sizing: border-box;
  width: 60vw;
  height: 100%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;

const InnerContainer = styled.div`
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
  height: 4rem;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
`;

const Title = styled.div`
  margin: 0.5rem auto;
  width: 90%;
  height: 3rem;
  color: #fff;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  span {
    line-height: 1.5rem;
    font-size: 1rem;
  }
`;
