import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';
import Spinner from '../../elements/Spinner';
import { SpinnerContainer } from './styled';

const siteIds = ['uTJtb3FaGNZcNiyCb', 'x27yj7ZTsPjEngPPy'];

const DynamicList = universal(import('../List'), {
  loading: (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  )
});
const DynamicPost = universal(import('../Post'), {
  loading: (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  )
});
const DynamicPage = universal(import('../Page'), {
  loading: (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  )
});

const Footer = universal(import('../Footer'));
const MyRFooter = universal(import('../../../shared/components/MyRFooter'));

class Column extends Component {
  static propTypes = {
    items: PropTypes.shape({}),
    active: PropTypes.bool.isRequired,
    slide: PropTypes.number.isRequired,
    siteId: PropTypes.string.isRequired
  };

  static defaultProps = {
    items: []
  };

  constructor() {
    super();

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ id, type }, index) {
    if (!id) return null;

    const { active, slide } = this.props;
    const key = id || `${type}${index}`;

    if (type === 'page') {
      return <DynamicPage key={key} id={id} active={active} slide={slide} />;
    }

    if (type === 'post') {
      return <DynamicPost key={key} id={id} active={active} slide={slide} />;
    }

    return <DynamicList key={key} id={id} type={type} active={active} slide={slide} />;
  }

  render() {
    const { items, siteId, slide } = this.props;

    return [
      items.map(this.renderItem),
      siteIds.includes(siteId) ? (
        <MyRFooter key="footer" siteId={siteId} slide={slide} />
      ) : (
        <Footer key="footer" />
      ),
    ];
  }
}

const mapStateToProps = state => ({
  siteId: state.build.siteId,
});

export default connect(mapStateToProps)(Column);
