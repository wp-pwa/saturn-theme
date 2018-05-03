import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import universal from 'react-universal-component';
import { dep } from 'worona-deps';
import SlotInjector from '../../../shared/components/SlotInjector';
import FetchWaypoint from '../FetchWaypoint';
import Item from './Item';

const siteIds = ['uTJtb3FaGNZcNiyCb', 'x27yj7ZTsPjEngPPy', 'CtCRo2fCnEja9Epub'];

const Footer = universal(import('../Footer'));
const MyRFooter = universal(import('../../../shared/components/MyRFooter'));

class Column extends Component {
  static propTypes = {
    column: PropTypes.shape({}).isRequired,
    isVisible: PropTypes.bool.isRequired,
    bar: PropTypes.string.isRequired,
    contextSsr: PropTypes.bool.isRequired,
    siteId: PropTypes.string.isRequired,
    featuredImageDisplay: PropTypes.bool,
    postBarTransparent: PropTypes.bool,
    postBarNavOnSsr: PropTypes.bool,
  };

  static defaultProps = {
    featuredImageDisplay: true,
    postBarTransparent: false,
    postBarNavOnSsr: true,
  };

  render() {
    const {
      column,
      isVisible,
      siteId,
      bar,
      contextSsr,
      featuredImageDisplay,
      postBarTransparent,
      postBarNavOnSsr,
    } = this.props;

    if (!isVisible) return <div />;

    const { mstId, items } = column;
    const isGallery = column.items[0].type === 'media';

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

    const renderItems = items.map(item => <Item key={item.mstId} item={item} column={column} />);
    // if (bar === 'single') {
    //   renderItems.push(<Item key={item.mstId} nextNonVisited column={column} />);
    // }

    return (
      <Fragment>
        <Placeholder
          key="placeholder"
          bar={bar}
          featuredImageDisplay={featuredImageDisplay}
          postBarTransparent={postBarTransparent}
          hasNav={postBarNavOnSsr && contextSsr}
          startsWithPage={items[0].type === 'page'}
        />
        <SlotInjector column={this.column}>{renderItems}</SlotInjector>
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

const mapStateToProps = state => {
  const featuredImage =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'featuredImage')(state) || {};
  const postBar =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'postBar')(state) || {};

  return {
    ssr: dep('build', 'selectors', 'getSsr')(state),
    siteId: state.build.siteId,
    featuredImageDisplay: featuredImage.display,
    postBarTransparent: postBar.transparent,
    postBarNavOnSsr: postBar.navOnSsr,
  };
};

export default compose(
  connect(mapStateToProps),
  inject((_stores, { column, ssr }) => ({
    itemsLength: column.items.length,
    isVisible: computed(
      () =>
        (ssr && column.isSelected) ||
        (!ssr && Math.abs(column.index - column.parentContext.selectedColumn.index) <= 1),
    ).get(),
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
