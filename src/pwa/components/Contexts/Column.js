import React, { Component, Fragment } from 'react';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';
import { dep } from 'worona-deps';
import Spinner from '../../elements/Spinner';
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
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    columnIndex: PropTypes.number.isRequired,
    bar: PropTypes.string.isRequired,
    ssr: PropTypes.bool.isRequired,
    siteId: PropTypes.string.isRequired,
    featuredImageDisplay: PropTypes.bool,
    postBarTransparent: PropTypes.bool,
    postBarNavOnSsr: PropTypes.bool,
    nextNonVisited: PropTypes.shape({}),
  };

  static defaultProps = {
    featuredImageDisplay: true,
    postBarTransparent: false,
    postBarNavOnSsr: true,
    nextNonVisited: null,
  };

  constructor(props) {
    super(props);
    // this.renderItemWithRoute = this.renderItemWithRoute.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ mstId, id, type, page }) {
    const { columnIndex } = this.props;
    if (!id) return null;

    if (page) {
      Post.preload();
      return <List key={mstId} type={type} id={id} page={page} columnIndex={columnIndex} />;
    }

    List.preload();

    if (type === 'page') return <Page key={mstId} id={id} columnIndex={columnIndex} />;
    if (type === 'media') return <Media key={mstId} id={id} columnIndex={columnIndex} />;
    return <Post key={mstId} type={type} id={id} mstId={mstId} columnIndex={columnIndex} />;
  }

  // renderItemWithRoute({ mstId, id, type, page, ready }) {
  //   const { columnIndex } = this.props;
  //   const routeWaypointProps = { type, id, page, columnIndex };
  //   return (
  //     <Fragment key={mstId}>
  //       <RouteWaypoint position="top" {...routeWaypointProps} />
  //       {Column.renderItem({ mstId, id, type, page, ready })}
  //       <RouteWaypoint position="bottom" {...routeWaypointProps} />
  //     </Fragment>
  //   );
  // }

  render() {
    const {
      items,
      siteId,
      columnIndex,
      bar,
      ssr,
      nextNonVisited,
      featuredImageDisplay,
      postBarTransparent,
      postBarNavOnSsr,
    } = this.props;

    const isGallery = items.length && items[0].type === 'media';

    // This should be removed at some point :D
    let footer;

    if (isGallery) {
      footer = null;
    } else {
      footer = siteIds.includes(siteId) ? (
        <MyRFooter key="footer" siteId={siteId} columnIndex={columnIndex} />
      ) : (
        <Footer key="footer" />
      );
    }

    let renderedItems;

    if (bar === 'single') {
      renderedItems = (nextNonVisited &&
      items.length &&
      items[0].parentColumn !== nextNonVisited.parentColumn
        ? [...items, nextNonVisited]
        : items
      ).map(this.renderItem);
    } else if (bar === 'list') {
      renderedItems = [
        ...items.map(this.renderItem),
        <FetchWaypoint
          key="fetch-waypoint"
          type={items[0].type}
          id={items[0].id}
          limit={3}
          columnIndex={columnIndex}
        />,
      ];
    } else {
      renderedItems = items.map(this.renderItem);
    }

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
        {renderedItems}
        {footer}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const featuredImage =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'featuredImage')(state) || {};
  const postBar =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'postBar')(state) || {};

  return {
    siteId: state.build.siteId,
    featuredImageDisplay: featuredImage.display,
    postBarTransparent: postBar.transparent,
    postBarNavOnSsr: postBar.navOnSsr,
  };
};

export default compose(
  connect(mapStateToProps),
  inject(({ connection }) => ({
    nextNonVisited: connection.selectedContext.nextNonVisited,
  })),
)(Column);

const Placeholder = styled.div`
  width: 100%;
  height: ${({ theme, bar, hasNav, featuredImageDisplay, postBarTransparent, startsWithPage }) => {
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
  background: ${({ theme }) => theme.colors.background};
`;
