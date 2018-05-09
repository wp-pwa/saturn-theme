import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Image from '../../../shared/components/Image';
import * as selectors from '../../selectors';
import * as selectorCreators from '../../selectorCreators';

const Media = ({ id, width, height, mstId, format, Ad }) => (
  <Container>
    <Image id={id} width="100vw" height={`${height * 100 / width}vw`} />
    {format && <Ad isMedia item={{ id, type: 'media', mstId }} {...format} />}
  </Container>
);

Media.propTypes = {
  Ad: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  ready: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  mstId: PropTypes.string.isRequired,
  format: PropTypes.shape({}),
};

Media.defaultProps = {
  format: null,
};

const mapStateToProps = (state, { id }) => {
  const adsFormats = dep('ads', 'selectorCreators', 'getContentFormats')('media')(state);

  return {
    Ad: dep('ads', 'components', 'Ad'),
    format: adsFormats && adsFormats[0],
  };
};

export default compose(
  connect(mapStateToProps),
  inject(({ connection, theme }, { id }) => ({
    ready: connection.entity('media', id).isReady,
    width: connection.entity('media', id).original.width,
    height: connection.entity('media', id).original.height,
    mstId: connection.selectedContext.getItem({ item: { type: 'media', id } }).mstId,
    lists: theme.listsFromMenu,
  })),
)(Media);

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
  background: #0e0e0e;
  width: 100vw;
  min-height: ${({ theme }) => `calc(100vh - ${theme.heights.bar})`};
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding-bottom: ${({ theme }) => theme.heights.bar};
`;
