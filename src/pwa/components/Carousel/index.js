import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { connect } from "react-redux";
import styled from "react-emotion";
import { dep } from "worona-deps";
import CarouselItem from "./CarouselItem";
import Spinner from "../../elements/Spinner";
import * as contexts from "../../contexts";

class Carousel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    ready: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({})),
    isCurrentList: PropTypes.bool,
    listRequested: PropTypes.func.isRequired,
    ssr: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    list: null,
    isCurrentList: null,
  };

  constructor() {
    super();

    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    const { type, id, ready, listRequested, ssr, active } = this.props;

    if (!ready && !ssr && active) {
      listRequested({ listType: type, listId: id });
    }
  }

  componentWillUpdate(nextProps) {
    const { type, id, ready, listRequested, ssr, active } = this.props;

    if (
      (ready !== nextProps.ready || ssr !== nextProps.ssr) &&
      !nextProps.ready &&
      !nextProps.ssr &&
      active
    ) {
      listRequested({ listType: type, listId: id });
    }
  }

  renderItem(post) {
    if (!post) return null;

    const { id, type, isCurrentList } = this.props;
    const list = { listType: type, listId: id, extract: true };
    const selected = { singleType: "post", singleId: post.id };

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
    const { title, size, list, ready } = this.props;

    return (
      <Container>
        <Title>{title}</Title>
        <InnerContainer size={size}>
          {ready ? <List>{list.map(this.renderItem)}</List> : <Spinner />}
        </InnerContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ssr: dep("build", "selectors", "getSsr")(state),
});

const mapDispatchToProps = dispatch => ({
  listRequested: payload =>
    setTimeout(() => dispatch(dep("connection", "actions", "listRequested")(payload)), 1),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  inject(({ connection }, { id, type, params }) => {
    const { fromList } = connection.selected;
    const isCurrentList = fromList.type === type && fromList.id === id;

    let list;
    let ready;

    if (isCurrentList) {
      list = connection.context.columns.reduce(
        (result, column) => result.concat(column.items.map(i => i.single)),
        [],
      );

      ready = true;
    } else {
      list = connection.list[type] && connection.list[type][id];
      ready = !!list && !!list.ready && !list.fetching;

      if (ready) {
        list = list.entities;
      }
    }

    if (ready) {
      if (params.exclude) {
        list = list.filter(entitie => entitie.id !== params.exclude);
      } else if (params.excludeTo) {
        const index = list.findIndex(entitie => entitie.id === params.excludeTo);
        list = list.slice(index + 1);
      }

      if (params.limit) {
        list = list.slice(0, 5);
      }

      return {
        ready,
        list,
        isCurrentList,
      };
    }

    return { ready };
  })(Carousel),
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
    if (size === "small") return 130;
    if (size === "medium") return 220;
    if (size === "large") return 270;
    return 220;
  }}px;
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
  -webkit-overflow-scrolling: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
