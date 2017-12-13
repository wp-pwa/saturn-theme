/* eslint-disable react/no-danger */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "react-emotion";
import Truncate from "react-truncate";
import { dep } from "worona-deps";
import Media from "../Media";

const CarouselItem = ({ selected, context, media, title, Link }) => (
  <Container>
    <Link selected={selected} context={context}>
      <a>
        <Media lazy lazyHorizontal id={media} width="60vw" height="100%" />
        <InnerContainer>
          <Title>
            <Truncate lines={2}>
              <span dangerouslySetInnerHTML={{ __html: title }} />
            </Truncate>
          </Title>
        </InnerContainer>
      </a>
    </Link>
  </Container>
);

CarouselItem.propTypes = {
  selected: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}).isRequired,
  media: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  Link: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
  Link: dep("connection", "components", "Link"),
});

export default connect(mapStateToProps)(CarouselItem);

const Container = styled.li`
  box-sizing: border-box;
  width: 60vw;
  height: 100%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.postListLight};
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

  span {
    line-height: 1.5rem;
    font-size: 1rem;
  }
`;
