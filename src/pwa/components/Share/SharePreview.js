import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as selectors from '../../selectors';
import Media from '../Media';

const SharePreview = ({ media, title }) =>
  <Container>
    <Media id={media} width="50%" />
    <Title dangerouslySetInnerHTML={{ __html: title }} />
  </Container>;

SharePreview.propTypes = {
  media: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  media: selectors.shareModal.getEntityMedia(state),
  title: selectors.shareModal.getEntityTitle(state)
});

export default connect(mapStateToProps)(SharePreview);

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
  width: 50%;
  font-size: 1rem;
  line-height: 1.4rem;
`;
