import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';
import { dep } from 'worona-deps';
import { flatten } from 'lodash';
import Spinner from '../../elements/Spinner';
import { SpinnerContainer } from './styled';

const siteIds = ['uTJtb3FaGNZcNiyCb', 'x27yj7ZTsPjEngPPy'];

const loading = (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

const DynamicList = universal(import('../List'), { loading });
const DynamicPost = universal(import('../Post'), { loading });
const DynamicPage = universal(import('../Page'), { loading });
const DynamicPicture = universal(import('../Picture'), { loading });

const Footer = universal(import('../Footer'));
const MyRFooter = universal(import('../../../shared/components/MyRFooter'));

class Column extends Component {
  static propTypes = {
    items: PropTypes.shape({}),
    nextItem: PropTypes.shape({}),
    active: PropTypes.bool.isRequired,
    slide: PropTypes.number.isRequired,
    siteId: PropTypes.string.isRequired,
    bar: PropTypes.string.isRequired,
    ssr: PropTypes.bool.isRequired,
    featuredImageDisplay: PropTypes.bool,
    postBarTransparent: PropTypes.bool,
    postBarNavOnSsr: PropTypes.bool,
  };

  static defaultProps = {
    items: [],
    featuredImageDisplay: true,
    postBarTransparent: false,
    postBarNavOnSsr: true,
    nextItem: null,
  };

  constructor() {
    super();

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ id, type }, index, items) {
    if (!id) return null;

    const { active, slide, nextItem } = this.props;
    const key = id || `${type}${index}`;

    if (type === 'page') {
      return <DynamicPage key={key} id={id} active={active} />;
    }

    if (type === 'post') {
      if (
        index === items.length - 1 &&
        nextItem &&
        nextItem.type === 'post' &&
        nextItem.ready &&
        nextItem.column.index !== slide
      ) {
        const { type: nextType, id: nextId } = nextItem;
        const nextKey = nextId || `${nextType}${index + 1}`;
        return [
          <DynamicPost key={key} id={id} active={active} />,
          <DynamicPost isNext key={nextKey} id={nextId} active={active} />,
        ];
      }
      return <DynamicPost key={key} id={id} active={active} />;
    }

    if (type === 'media') {
      return <DynamicPicture key={key} id={id} active={active} />;
    }

    return <DynamicList key={key} id={id} type={type} active={active} />;
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

    let footer = siteIds.includes(siteId) ? (
      <MyRFooter key="footer" siteId={siteId} slide={slide} />
    ) : (
      <Footer key="footer" />
    );

    if (isGallery) footer = null;

    const itemsFlatten = flatten(items.map(this.renderItem));
    return [
      <Placeholder
        key="placeholder"
        bar={bar}
        featuredImageDisplay={featuredImageDisplay}
        postBarTransparent={postBarTransparent}
        hasNav={postBarNavOnSsr && ssr}
        startsWithPage={items[0].type === 'page'}
      />,
      itemsFlatten,
      footer,
    ];
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

export default connect(mapStateToProps)(Column);

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
