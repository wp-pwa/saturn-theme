import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import CarouselItem from './CarouselItem';
import Spinner from '../../elements/Spinner';
import { single } from '../../contexts';
import Lazy from '../../elements/LazyAnimated';

class Carousel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    listType: PropTypes.string.isRequired,
    listId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    ready: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    listRequested: PropTypes.func.isRequired,
    entities: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))]),
    isCurrentList: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    entities: [],
  };

  static lazyProps = {
    animate: Lazy.onMount,
    ignoreSsr: true,
    offsetVertical: 2000,
    offsetHorizontal: -50,
    debounce: false,
    throttle: 300,
    placeholder: <Spinner />,
  };

  constructor() {
    super();

    this.state = {
      list: [],
    };

    this.requestList = this.requestList.bind(this);
    this.filterList = this.filterList.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    if (this.props.entities && this.props.entities.length) {
      this.filterList();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.entities !== nextProps.entities) {
      this.filterList(nextProps);
    }
  }

  requestList() {
    const { listType, listId, listRequested, ready, fetching, isCurrentList } = this.props;

    if (!isCurrentList && !ready && !fetching) {
      listRequested({ list: { type: listType, id: listId, page: 1 } });
    }
  }

  filterList(nextProps = this.props) {
    const { exclude, excludeTo, limit, entities } = nextProps;

    let list;

    // Filters lists depending on the options passed as props.
    if (exclude) {
      list = entities.filter(entitie => entitie.id !== exclude);
    } else if (excludeTo) {
      const index = entities.findIndex(entitie => entitie.id === excludeTo);
      list = entities.slice(index + 1);
    }

    if (limit) {
      list = list.slice(0, 5);
    }

    this.setState({
      list,
    });
  }

  renderItem(post) {
    if (!post) return null;

    const { listType, listId } = this.props;
    const list = { type: listType, id: listId, page: 1, extract: 'horizontal' };
    const item = { type: post.type, id: post.id, fromList: { listType, listId, page: 1 } };
    const context = single(list);

    return (
      <CarouselItem
        key={post.id}
        id={post.id}
        item={item}
        context={context}
        media={post.media.featured.id}
        title={post.title}
      />
    );
  }

  render() {
    const { title, size, ready, fetching } = this.props;
    const { list } = this.state;

    const listReady = ready && !fetching && list.length;

    return (
      <Container className="carousel">
        <Fragment>
          <Title>{title}</Title>
          <InnerContainer size={size}>
            <Lazy onContentVisible={this.requestList} {...Carousel.lazyProps}>
              {listReady ? <List>{list.map(this.renderItem)}</List> : []}
            </Lazy>
          </InnerContainer>
        </Fragment>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  listRequested: payload => dispatch(dep('connection', 'actions', 'listRequested')(payload)),
});

export default compose(
  connect(null, mapDispatchToProps),
  inject(({ connection }, { listType, listId, itemType, itemId }) => {
    const { fromList } = connection.selectedContext.getItem({
      item: { type: itemType, id: itemId },
    });

    return {
      isCurrentList: listType === fromList.type && listId === fromList.id,
      entities: connection.list(listType, listId).entities,
      ready: connection.list(listType, listId).ready,
      fetching: connection.list(listType, listId).fetching,
    };
  }),
)(Carousel);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  margin-bottom: 30px;
`;

const Title = styled.h4`
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 0 15px;
`;

const InnerContainer = styled.div`
  height: ${({ size }) => {
    if (size === 'small') return 20;
    if (size === 'medium') return 30;
    if (size === 'large') return 40;
    return 220;
  }}vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    height: 100%;
    width: 100%;
  }
`;

const List = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: stretch;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
