import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import * as selectors from '../../selectors';
import Media from '../Media';

const SharePreview = ({ media, title }) => (
  <Container>
    <Media id={media} width="50vw" />
    <Title dangerouslySetInnerHTML={{ __html: title }} />
  </Container>
);

SharePreview.propTypes = {
  media: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  id: selectors.share.getId(state)
});

export default connect(mapStateToProps)(
  inject((stores, { id }) => ({
    title: stores.connection.single.post[id].title,
    media: stores.connection.single.post[id].featured.id
  }))(SharePreview)
);

const Container = styled.div`
  width: 100vw;
  box-sizing: border-box;
  min-height: 130px;
  padding: 15px;
  display: flex;
  border-bottom: 1px solid #ddd;

  @media ${({ theme }) => theme.tablet} {
    flex-direction: column;
    width: 60vw;

    & > div {
      height: 80%;
      width: 100%;
    }
  }
`;

const Title = styled.h1`
  box-sizing: border-box;
  margin: 0;
  padding-left: 5px;
  width: 50vw;
  font-size: 1rem;
  line-height: 1.4rem;

  @media ${({ theme }) => theme.tablet} {
    margin-top: 10px;
    width: 100%;
  }
`;
