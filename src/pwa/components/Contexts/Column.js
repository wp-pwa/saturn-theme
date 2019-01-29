import React, { Component, Fragment } from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';
import RouteWaypoint from '../RouteWaypoint';
import SlotInjector from '../../../shared/components/SlotInjector';
import Spinner from '../../../shared/components/Spinner';
import { SpinnerContainer } from './styled';
import FetchWaypoint from '../FetchWaypoint';
import NavbarSlotPlaceholder from '../NavbarSlotPlaceholder';

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
    featuredImageDisplay: PropTypes.bool,
    postBarTransparent: PropTypes.bool,
    postBarNavOnSsr: PropTypes.bool,
    nextNonVisited: PropTypes.shape({}),
    hasList: PropTypes.bool.isRequired,
    customFooterName: PropTypes.string,
  };

  static defaultProps = {
    featuredImageDisplay: true,
    postBarTransparent: false,
    postBarNavOnSsr: true,
    nextNonVisited: null,
    customFooterName: null,
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

  renderItemWithRoute(item, index) {
    const { mstId, id, type, page, ready } = item;
    const { isSelected } = this.props;
    const routeWaypointProps = { type, id, page, columnId: this.props.mstId };

    return (
      <RouteWaypoint key={mstId} {...routeWaypointProps}>
        <SlotInjector
          isAboveTheFold={index === 0}
          position="before item"
          item={item}
          active={isSelected}
          render={({ slots }) => (
            <Fragment>
              {slots.length ? <MarginTop height={30} /> : null}
              {slots}
            </Fragment>
          )}
        />
        <SlotInjector
          isAboveTheFold={index === 0}
          position={`before item ${index + 1}`}
          item={item}
          active={isSelected}
        />
        {Column.renderItem({ mstId, id, type, page, ready })}
        <SlotInjector
          position={`after item ${index + 1}`}
          item={item}
          active={isSelected}
        />
        <SlotInjector position="after item" item={item} active={isSelected} />
      </RouteWaypoint>
    );
  }

  render() {
    const {
      mstId,
      isSelected,
      items,
      bar,
      ssr,
      nextNonVisited,
      featuredImageDisplay,
      postBarTransparent,
      postBarNavOnSsr,
      hasList,
      customFooterName,
    } = this.props;

    const isGallery = items.length && items[0].type === 'media';

    // This should be removed at some point :D
    let footer;

    if (isGallery) {
      footer = null;
    } else {
      footer =
        customFooterName === 'myr' ? (
          <MyRFooter key="footer" columnId={mstId} />
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
        <NavbarSlotPlaceholder item={items[0]} />
        <Placeholder
          key="placeholder"
          bar={bar}
          featuredImageDisplay={featuredImageDisplay}
          postBarTransparent={postBarTransparent}
          hasNav={postBarNavOnSsr && ssr}
          startsWithPage={items[0].type === 'page'}
        />
        {renderItems.map(this.renderItemWithRoute)}
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
        <SlotInjector position="before footer" active={isSelected} />
        {footer}
        <SlotInjector position="after footer" active={isSelected} />
      </Fragment>
    );
  }
}

export default inject(({ stores: { connection, settings } }, { mstId }) => {
  const featuredImage = settings.theme.featuredImage || {};
  const postBar = settings.theme.postBar || {};
  const column = connection.selectedContext.getColumn(mstId);
  const customFooter = settings.theme.customFooter || {};
  const hasFeaturedImage = !!column.items[0].entity.media.featured.id;
  const hasFeaturedVideo = !!column.items[0].entity.raw.featured_video;

  return {
    nextNonVisited: connection.selectedContext.nextNonVisited,
    hasList: column.items.some(item => item.type === 'latest'),
    isSelected: column.isSelected,
    featuredImageDisplay:
      !hasFeaturedVideo && hasFeaturedImage && featuredImage.display,
    postBarTransparent: postBar.transparent,
    postBarNavOnSsr: postBar.navOnSsr,
    customFooterName: customFooter.name,
  };
})(Column);

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

const MarginTop = styled.div`
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
`;
