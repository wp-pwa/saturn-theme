import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import CarouselItem from './CarouselItem';
import Spinner from '../../elements/Spinner';
import * as contexts from '../../contexts';

class Carousel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    ready: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    isCurrentList: PropTypes.bool.isRequired,
    listRequested: PropTypes.func.isRequired,
    ssr: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    list: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))])
  };

  static defaultProps = {
    list: null
  };

  constructor() {
    super();

    this.state = {
      list: null
    };

    this.setList = this.setList.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    if (this.props.list) this.setList();
  }

  componentDidMount() {
    const { type, id, listRequested, ssr, active, isCurrentList, ready, fetching } = this.props;

    if (!isCurrentList && !ready && !fetching && !ssr && active) {
      listRequested({ listType: type, listId: id });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { type, id, ready, listRequested, ssr, active, list } = this.props;

    if (
      // (ready !== nextProps.ready || ssr !== nextProps.ssr) &&
      !nextProps.ready &&
      !nextProps.fetching &&
      !nextProps.ssr &&
      active
    ) {
      listRequested({ listType: type, listId: id });
    }

    if (list && list !== nextProps.list) {
      this.setList(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps.title, nextProps.active);
    if (this.props.active) {
      if (this.props.ready !== nextProps.ready) console.log('ready:', nextProps.ready);
      if (this.props.fetching !== nextProps.fetching) console.log('fetching:', nextProps.fetching);
      if (this.props.list !== nextProps.list) console.log('props list:', nextProps.list);
      if (this.props.active !== nextProps.active) console.log('active:', nextProps.active);
      if (this.state.list !== nextState.list) console.log('state list:', nextState.list);
    }

    return (
      this.props.ssr !== nextProps.ssr ||
      (this.props.ready !== nextProps.ready && (nextProps.ready && !nextProps.fetching))
    );
  }

  setList(props = this.props) {
    const { params, isCurrentList, list } = props;

    let filteredList;

    if (isCurrentList) {
      filteredList = list.reduce(
        (result, column) => result.concat(column.items.map(i => i.single)),
        []
      );
    } else {
      filteredList = list;
    }

    if (params.exclude) {
      filteredList = filteredList.filter(entitie => entitie.id !== params.exclude);
    } else if (params.excludeTo) {
      const index = filteredList.findIndex(entitie => entitie.id === params.excludeTo);
      filteredList = list.slice(index + 1);
    }

    if (params.limit) {
      filteredList = list.slice(0, 5);
    }

    console.log(filteredList)

    this.setState({
      list: filteredList
    });
  }

  renderItem(post) {
    if (!post) return null;

    const { id, type, isCurrentList } = this.props;
    const list = { listType: type, listId: id, extract: true };
    const selected = { singleType: 'post', singleId: post.id };

    let context = null;

    if (!isCurrentList) {
      context = contexts.singleLink(list);
    }

    return (
      <CarouselItem
        key={post.id}
        id={post.id}
        selected={selected}
        context={context}
        media={post.featured.id}
        title={post.title}
      />
    );
  }

  render() {
    const { title, size, ready, fetching } = this.props;
    const { list } = this.state;

    return !list || (list && list.length > 0) ? (
      <Container>
        <Title>{title}</Title>
        <InnerContainer size={size}>
          {ready && !fetching ? <List>{list && list.map(this.renderItem)}</List> : <Spinner />}
        </InnerContainer>
      </Container>
    ) : null;
  }
}

const mapStateToProps = state => ({
  ssr: dep('build', 'selectors', 'getSsr')(state)
});

const mapDispatchToProps = dispatch => ({
  listRequested: payload =>
    setTimeout(() => dispatch(dep('connection', 'actions', 'listRequested')(payload)), 1)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  inject(({ connection }, { id, type }) => {
    const { fromList } = connection.selected;
    const isCurrentList = fromList.type === type && fromList.id === id;
    const list = connection.list[type] && connection.list[type][id];

    return {
      isCurrentList,
      list: isCurrentList ? connection.context.columns : list && list.entities,
      length: connection.context.columns.length,
      ready: !!list && list.ready,
      fetching: !!list && list.fetching
    };
  })(Carousel)
);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  margin-bottom: 30px;
`;

const Title = styled.h4`
  margin: 0;
  margin-top: 20px;
  padding: 0 15px 10px 15px;
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
