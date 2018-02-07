import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import * as selectors from '../../selectors';
import Media from '../../../shared/components/Media';

const SharePreview = ({ media, title }) => (
  <Container>
    <Media id={media} width="50vw" height="120px" />
    <Title dangerouslySetInnerHTML={{ __html: title }} />
  </Container>
);

SharePreview.propTypes = {
  media: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  id: selectors.share.getId(state),
  type: selectors.share.getWpType(state),
});

export default connect(mapStateToProps)(
  inject((stores, { id, type }) => ({
    title: stores.connection.single[type][id].title,
    media: type === 'media' ? id : stores.connection.single[type][id].featured.id,
  }))(SharePreview),
);

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: 15px;
  min-height: 130px;
  padding: 15px;
  display: flex;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h1`
  box-sizing: border-box;
  margin: 0;
  padding-left: 15px;
  width: 50vw;
  font-size: 1rem;
  line-height: 1.4rem;
`;
