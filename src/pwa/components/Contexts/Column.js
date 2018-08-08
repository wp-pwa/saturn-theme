import React, { Component, Fragment } from 'react';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';
import RouteWaypoint from '../RouteWaypoint';
import SlotInjector from '../../../shared/components/SlotInjector';
import Spinner from '../../../shared/components/Spinner';
import { SpinnerContainer } from './styled';
import FetchWaypoint from '../FetchWaypoint';

const siteIds = ['uTJtb3FaGNZcNiyCb', 'x27yj7ZTsPjEngPPy', 'CtCRo2fCnEja9Epub'];

const loading = (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

const List = universal(import('../List'), { loading });
const Post = universal(import('../Post'), { loading });
const Page = universal(import('../Page'), { loading });
const Media = universal(import('../Media'), { loading });

const Footer = universal(import('../Footer'));
const MyRFooter = universal(import('../../../shared/components/MyRFooter'));

class Column extends Component {
  static propTypes = {
    mstId: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    bar: PropTypes.string.isRequired,
    ssr: PropTypes.bool.isRequired,
    siteId: PropTypes.string.isRequired,
    featuredImageDisplay: PropTypes.bool,
    postBarTransparent: PropTypes.bool,
    postBarNavOnSsr: PropTypes.bool,
    nextNonVisited: PropTypes.shape({}),
    hasList: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    featuredImageDisplay: true,
    postBarTransparent: false,
    postBarNavOnSsr: true,
    nextNonVisited: null,
  };

  static renderItem({ mstId, id, type, page }) {
    if (!id) return null;

    if (page) {
      Post.preload();
      return (
        <List key={mstId} type={type} id={id} page={page} columnId={mstId} />
      );
    }

    List.preload();

    if (type === 'page') return <Page key={mstId} id={id} columnId={mstId} />;
    if (type === 'media') return <Media key={mstId} id={id} />;
    return <Post key={mstId} type={type} id={id} columnId={mstId} />;
  }

  constructor(props) {
    super(props);
    this.column = { type: props.bar, mstId: props.mstId };
    this.renderItemWithRoute = this.renderItemWithRoute.bind(this);
  }

  renderItemWithRoute({ mstId, id, type, page, ready }) {
    const routeWaypointProps = { type, id, page, columnId: this.props.mstId };

    return (
      <RouteWaypoint key={mstId} {...routeWaypointProps}>
        {Column.renderItem({ mstId, id, type, page, ready })}
      </RouteWaypoint>
    );
  }

  render() {
    const {
      mstId,
      isSelected,
      items,
      siteId,
      bar,
      ssr,
      nextNonVisited,
      featuredImageDisplay,
      postBarTransparent,
      postBarNavOnSsr,
      hasList,
    } = this.props;

    const isGallery = items.length && items[0].type === 'media';

    // This should be removed at some point :D
    let footer;

    if (isGallery) {
      footer = null;
    } else {
      footer = siteIds.includes(siteId) ? (
        <MyRFooter key="footer" siteId={siteId} columnId={mstId} />
      ) : (
        <Footer key="footer" />
      );
    }

    const renderItems =
      isSelected && nextNonVisited && bar === 'single' && !hasList
        ? [...items, nextNonVisited]
        : items;

    return (
      <Fragment>
        <Placeholder
          key="placeholder"
          bar={bar}
          featuredImageDisplay={featuredImageDisplay}
          postBarTransparent={postBarTransparent}
          hasNav={postBarNavOnSsr && ssr}
          startsWithPage={items[0].type === 'page'}
        />
        <SlotInjector column={this.column} active={isSelected}>
          {renderItems.map(this.renderItemWithRoute)}
        </SlotInjector>
        {bar === 'list' ? (
          <FetchWaypoint
            key="fetch-waypoint"
            type={items[0].type}
            id={items[0].id}
            limit={3}
            columnId={mstId}
            columnLength={items.length}
          />
        ) : null}
        {footer}
      </Fragment>
    );
  }
}

export default inject(
  ({ stores: { connection, settings, build } }, { mstId }) => {
    const featuredImage = settings.theme.featuredImage || {};
    const postBar = settings.theme.postBar || {};
    const column = connection.selectedContext.getColumn(mstId);

    return {
      nextNonVisited: connection.selectedContext.nextNonVisited,
      hasList: column.items.some(item => item.type === 'latest'),
      isSelected: column.isSelected,
      featuredImageDisplay: featuredImage.display,
      postBarTransparent: postBar.transparent,
      postBarNavOnSsr: postBar.navOnSsr,
      siteId: build.siteId,
    };
  },
)(Column);

const Placeholder = styled.div`
  width: 100%;
  height: ${({
    theme,
    bar,
    hasNav,
    featuredImageDisplay,
    postBarTransparent,
    startsWithPage,
  }) => {
    if (bar === 'list') {
      return `calc(${theme.heights.bar} + ${theme.heights.navbar} - 1px)`;
    }

    if (bar === 'single') {
      if (hasNav && (!featuredImageDisplay || startsWithPage)) {
        return `calc(${theme.heights.bar} + ${theme.heights.navbar} - 1px)`;
      }

      if (postBarTransparent && !hasNav) {
        return 0;
      }
    }

    return theme.heights.bar;
  }};
  background: ${({ theme, bar }) =>
    bar === 'media' ? '#0e0e0e' : theme.colors.background};
`;
