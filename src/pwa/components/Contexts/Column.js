import React, { Component } from 'react';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';

const DynamicList = universal(import('../List'));
const DynamicPost = universal(import('../Post'));
const DynamicPage = universal(import('../Page'));

class Column extends Component {
  static propTypes = {
    items: PropTypes.shape({}),
    active: PropTypes.bool.isRequired,
    slide: PropTypes.number.isRequired,
  };

  static defaultProps = {
    items: [],
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
      return <DynamicPage key={key} id={id} />;
    }

    if (type === 'post') {
      return <DynamicPost key={key} id={id} active={active} slide={slide} />;
    }

    return <DynamicList key={key} id={id} type={type} active={active} slide={slide} />;
  }

  render() {
    const { items } = this.props;

    return items.map(this.renderItem);
  }
}

export default Column;
