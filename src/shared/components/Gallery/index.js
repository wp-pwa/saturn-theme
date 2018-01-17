import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Item from './Item';

class Gallery extends Component {
  componentWillMount() {
    const { ids, requestMedia } = this.props;
    requestMedia(ids);
  }
  render() {
    const { ready, ids } = this.props;
    const context = {
      items: ids.map(id => ({ singleType: 'media', singleId: id })),
      infinite: false,
      options: {
        bar: 'single',
      },
    };

    const items = ids.map(id => <Item key={id} id={id} context={context} />);

    return (
      <Container>
        <InnerContainer>{(ready && <List>{items}</List>) || null}</InnerContainer>
      </Container>
    );
  }
}

Gallery.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  requestMedia: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  ssr: dep('build', 'selectors', 'getSsr')(state),
});

const mapDispatchToProps = (dispatch, { name = 'gallery', ids }) => ({
  requestMedia: () =>
    dispatch(
      dep('connection', 'actions', 'customRequested')({
        name,
        singleType: 'media',
        params: {
          include: ids,
          per_page: ids.length,
        },
      }),
    ),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  inject((stores, { ssr, name = 'gallery' }) => ({
    ready: !ssr && stores.connection.custom[name].ready,
  })),
)(Gallery);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  margin-bottom: 30px;
`;

const InnerContainer = styled.div`
  height: 30vh;
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
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
