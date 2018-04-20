import React, { Component, Fragment } from 'react';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';
import { dep } from 'worona-deps';
import RouteWaypoint from '../RouteWaypoint';
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
    isSelected: PropTypes.bool.isRequired,
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

  static renderItem({ mstId, id, type, page }) {
    if (!id) return null;

    if (page) {
      Post.preload();
      return <List key={mstId} type={type} id={id} page={page} mstId={mstId} />;
    }

    List.preload();

    if (type === 'page') return <Page key={mstId} id={id} />;
    if (type === 'media') return <Media key={mstId} id={id} />;
    return <Post key={mstId} type={type} id={id} mstId={mstId} />;
  }

  constructor(props) {
    super(props);
    this.renderItemWithRoute = this.renderItemWithRoute.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { items, isSelected } = this.props;

    if (items !== nextProps.items) return true;

    return isSelected || nextProps.isSelected;
  }

  renderItemWithRoute({ mstId, id, type, page, ready }) {
    const { isSelected } = this.props;
    const routeWaypointProps = { type, id, page, isSelectedColumn: isSelected };
    return (
      <RouteWaypoint key={mstId} {...routeWaypointProps}>
        {Column.renderItem({ mstId, id, type, page, ready })}
      </RouteWaypoint>
    );
  }

  render() {
    const {
      items,
      siteId,
      bar,
      ssr,
      isSelected,
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
        <MyRFooter key="footer" siteId={siteId} />
      ) : (
        <Footer key="footer" />
      );
    }

    const renderItems =
      isSelected && nextNonVisited && bar === 'single' ? [...items, nextNonVisited] : items;

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
        {renderItems.map(this.renderItemWithRoute)}
        {bar === 'list' ? (
          <FetchWaypoint
            key="fetch-waypoint"
            type={items[0].type}
            id={items[0].id}
            limit={3}
            isSelectedColumn={isSelected}
            columnLength={items.length}
          />
        ) : null}
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
  background: ${({ theme, bar }) => (bar === 'media' ? '#0e0e0e' : theme.colors.background)};
`;
