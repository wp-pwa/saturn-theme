import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Item from './Item';

class Gallery extends Component {
  componentWillMount() {
    const { ids, requestMedia } = this.props;
    requestMedia(ids);
  }
  render() {
    const { ids } = this.props;
    return (
      <Container>
        <InnerContainer>
          <List>{ids.map(id => <Item id={id} />)}</List>
        </InnerContainer>
      </Container>
    );
  }
}

Gallery.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  requestMedia: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, { ids }) => ({
  requestMedia: () =>
    dispatch(
      dep('connection', 'actions', 'customRequested')({
        name: 'gallery',
        singleType: 'media',
        params: {
          include: ids,
          per_page: ids.length,
        },
      }),
    ),
});

export default connect(undefined, mapDispatchToProps)(Gallery);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  margin-bottom: 30px;
`;

const InnerContainer = styled.div`
  height: ${({ size }) => {
    if (size === 'small') return 20;
    if (size === 'medium') return 30;
    if (size === 'large') return 40;
    return 220;
  }}vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: stretch;
  list-style: none;
  margin: 0 !important;
  padding: 0;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
