import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';
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
    ssr: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    items: [],
    nextItem: null,
  };

  constructor() {
    super();

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ id, type }, index, items) {
    if (!id) return null;

    const { active, slide, ssr, nextItem } = this.props;
    const key = id || `${type}${index}`;

    if (type === 'page') {
      return <DynamicPage key={key} id={id} active={active} slide={slide} />;
    }

    if (type === 'post') {
      if (index === items.length - 1 && nextItem && nextItem.type === 'post') {
        const { type: nextType, id: nextId } = nextItem;
        const nextKey = nextId ||`${nextType}${index + 1}`;
        return [
          <DynamicPost key={key} id={id} active={active} slide={slide} ssr={ssr} />,
          <DynamicPost key={nextKey} id={nextId} active={false} slide={slide} ssr={ssr} />,
        ];
      }
      return <DynamicPost key={key} id={id} active={active} slide={slide} ssr={ssr} />;
    }

    if (type === 'media') {
      return <DynamicPicture key={key} id={id} active={active} slide={slide} />;
    }

    return <DynamicList key={key} id={id} type={type} active={active} slide={slide} />;
  }

  render() {
    const { items, siteId, slide } = this.props;
    const isGallery = items[0].type === 'media';

    let footer = siteIds.includes(siteId) ? (
      <MyRFooter key="footer" siteId={siteId} slide={slide} />
    ) : (
      <Footer key="footer" />
    );

    if (isGallery) footer = null;

    const itemsFlatten = flatten(items.map(this.renderItem));
    return [itemsFlatten, footer];
  }
}

const mapStateToProps = state => ({
  siteId: state.build.siteId,
});

export default connect(mapStateToProps)(Column);
