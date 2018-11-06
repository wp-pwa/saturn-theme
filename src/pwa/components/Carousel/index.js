import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import CarouselItem from './CarouselItem';
import Spinner from '../../../shared/components/Spinner';
import { single } from '../../../shared/contexts';
import Lazy from '../../../shared/components/LazyAnimated';

class Carousel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    listType: PropTypes.string.isRequired,
    listId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    ready: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    fetchListPage: PropTypes.func.isRequired,
    entities: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.arrayOf(PropTypes.shape({})),
    ]),
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
    const {
      listType,
      listId,
      fetchListPage,
      ready,
      fetching,
      isCurrentList,
    } = this.props;

    if (!isCurrentList && !ready && !fetching) {
      fetchListPage({ type: listType, id: listId, page: 1 });
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
    const item = {
      type: post.type,
      id: post.id,
      fromList: { listType, listId, page: 1 },
    };
    const context = single(list);

    return (
      <CarouselItem
        key={post.id}
        id={post.id}
        item={item}
        context={context}
        media={post.media.featured.id || post.media.content[0]}
        title={post.title}
      />
    );
  }

  render() {
    const { title, ready, fetching } = this.props;
    const { list } = this.state;

    const listReady = ready && !fetching && list.length;

    return (
      <Container className="carousel">
        <Fragment>
          <Title>{title}</Title>
          <InnerContainer>
            <Lazy onContentVisible={this.requestList} {...Carousel.lazyProps}>
              {listReady ? (
                <List length={list.length}>{list.map(this.renderItem)}</List>
              ) : (
                <Spinner />
              )}
            </Lazy>
          </InnerContainer>
        </Fragment>
      </Container>
    );
  }
}

export default inject(
  ({ stores: { connection } }, { listType, listId, itemType, itemId }) => {
    const { fromList } = connection.selectedContext.getItem({
      item: { type: itemType, id: itemId },
    });

    return {
      isCurrentList: listType === fromList.type && listId === fromList.id,
      entities: connection.list(listType, listId).entities,
      ready: connection.list(listType, listId).isReady,
      fetching: connection.list(listType, listId).isFetching,
      fetchListPage: connection.fetchListPage,
    };
  },
)(Carousel);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0 16px;
  margin: 16px 0;

  &:first-child {
    margin-top: 24px;
  }

  &:last-child {
    margin-bottom: 24px;
  }
`;

const Title = styled.h4`
  box-sizing: border-box;
  font-size: 1rem;
  line-height: 1.25;
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.link};
`;

const InnerContainer = styled.div`
  position: relative;
  left: -16px;
  width: 100vw;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  padding-top: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  & > div {
    width: 100%;
    height: 100%;
  }
`;

const List = styled.ul`
  box-sizing: border-box;
  width: calc(
    16px + 8px + (200px * ${({ length }) => length}) +
      (8px * ${({ length }) => length})
  );
  list-style: none;
  display: flex;
  padding: 0 16px;
  margin: 0;
`;
