import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import universal from 'react-universal-component';
import HeaderList from '../HeaderList';
import HeaderSingle from '../HeaderSingle';
import ShareBar from '../ShareBar';
import Slider from '../../elements/Swipe';

const DynamicList = universal(import('../List'));
const DynamicPost = universal(import('../Post'));
const DynamicPage = universal(import('../Page'));

class Context extends Component {
  static propTypes = {
    activeSlide: PropTypes.number.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    ssr: PropTypes.bool.isRequired,
    routeChangeRequested: PropTypes.func.isRequired,
    bar: PropTypes.string.isRequired,
  };

  constructor() {
    super();

    this.renderLists = this.renderLists.bind(this);
    this.handleOnChangeIndex = this.handleOnChangeIndex.bind(this);
  }

  handleOnChangeIndex({ index, fromProps }) {
    if (fromProps) return;

    const { routeChangeRequested, lists } = this.props;
    const { listId, listType, singleType, singleId } = lists[index];
    const selected = {};

    if (singleType) {
      selected.singleType = singleType;
      selected.singleId = singleId;
    } else {
      selected.listType = listType;
      selected.listId = listId;
    }

    routeChangeRequested({
      selected,
      method: 'push',
    });
  }

  renderLists({ id, type }, index) {
    const { activeSlide, ssr } = this.props;
    const key = id || `${type}${id}${index}`;

    if (!id) return <div key={key} />;

    if (index < activeSlide - 1 || index > activeSlide + 1) return <div key={key} />;

    if (activeSlide !== index && ssr) return <div key={key} />;

    if (type === 'page') {
      return <DynamicPage key={key} id={id} />;
    }

    if (type === 'post') {
      return <DynamicPost key={key} id={id} active={activeSlide === index} slide={index} />;
    }

    return <DynamicList key={key} id={id} type={type} active={index === activeSlide} />;
  }

  render() {
    const { lists, activeSlide, bar } = this.props;

    return [
      bar === 'list' && <HeaderList key="header-list" />,
      bar === 'single' && <HeaderSingle key="header-single" />,
      <Slider key="slider" index={activeSlide} onChangeIndex={this.handleOnChangeIndex}>
        {lists.map(this.renderLists)}
      </Slider>,
      bar === 'single' && <ShareBar key="share-bar" />,
    ];
  }
}

const mapStateToProps = state => ({
  ssr: dep('build', 'selectors', 'getSsr')(state),
});

const mapDispatchToProps = dispatch => ({
  routeChangeRequested: payload =>
    dispatch(dep('connection', 'actions', 'routeChangeRequested')(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  inject(({ connection }) => {
    const lists = connection.context.columns.map(column => column.items[0]);
    const { columns, column } = connection.context;

    return {
      lists,
      activeSlide: columns.indexOf(column),
      bar: connection.context.options.bar,
    };
  })(Context),
);
