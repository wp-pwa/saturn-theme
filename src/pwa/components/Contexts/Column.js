import React, { Component, Fragment } from 'react';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';
import { dep } from 'worona-deps';
import { flatten } from 'lodash';
import Spinner from '../../elements/Spinner';
import { SpinnerContainer } from './styled';

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
    active: PropTypes.bool.isRequired,
    slide: PropTypes.number.isRequired,
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

  constructor() {
    super();

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ mstId, id, type, page, ready }) {
    if (!id) return null;

    const { active, nextNonVisited } = this.props;

    if (type === 'page') {
      return <Page key={mstId} id={id} active={active} />;
    }

    if (type === 'post') {
      if (nextNonVisited) {
        const nextMstId = nextNonVisited.mstId;
        const nextId = nextNonVisited.id;

        List.preload();

        return (
          <Fragment>
            <Post key={mstId} id={id} active={active} ready={ready} />
            <Post isNext key={nextMstId} id={nextId} active={active} />
          </Fragment>
        );
      }

      return <Post key={mstId} id={id} active={active} ready={ready} />;
    }

    if (type === 'media') {
      return <Media key={mstId} id={id} active={active} />;
    }

    Post.preload();

    return <List key={mstId} id={id} type={type} page={page} active={active} />;
  }

  render() {
    const {
      items,
      siteId,
      slide,
      bar,
      ssr,
      featuredImageDisplay,
      postBarTransparent,
      postBarNavOnSsr,
    } = this.props;

    const isGallery = items[0].type === 'media';

    // This should be removed at some point :D
    let footer;

    if (isGallery) {
      footer = null;
    } else {
      footer = siteIds.includes(siteId) ? (
        <MyRFooter key="footer" siteId={siteId} slide={slide} />
      ) : (
        <Footer key="footer" />
      );
    }

    const itemsFlatten = flatten(items.map(this.renderItem));

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
        {itemsFlatten}
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
