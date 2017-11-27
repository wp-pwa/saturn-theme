import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Slider from '../../elements/Swipe';
import List from './List';
import * as actions from '../../actions';

class Lists extends Component {
  static propTypes = {
    currentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    currentType: PropTypes.string.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    status: PropTypes.string.isRequired,
    ssr: PropTypes.bool.isRequired,
    activeSlideHasChanged: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.getActiveIndex = this.getActiveIndex.bind(this);
    this.renderLists = this.renderLists.bind(this);
    this.handleOnChangeIndex = this.handleOnChangeIndex.bind(this);
  }

  getActiveIndex() {
    const { currentType, currentId, lists } = this.props;

    return lists.findIndex(
      ({ listType, listId }) => listType === currentType && listId === currentId,
    );
  }

  handleOnChangeIndex({ index }) {
    const { activeSlideHasChanged, lists } = this.props;
    const { listId, listType } = lists[index];

    activeSlideHasChanged({ listId, wpType: listType });
  }

  renderLists({ id, type }, index) {
    const { status, ssr } = this.props;
    const activeIndex = this.getActiveIndex();

    if (index < activeIndex - 1 || index > activeIndex + 1) return <div key={id} />;

    if (activeIndex !== index && (ssr || /entering|exited/.test(status))) return <div key={id} />;

    return <List key={index} id={id} type={type} active={index === activeIndex} />;
  }

  render() {
    const { lists, status } = this.props;

    return (
      <Container status={status}>
        <Slider index={this.getActiveIndex()} onChangeIndex={this.handleOnChangeIndex}>
          {lists.map(this.renderLists)}
        </Slider>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ssr: dep('build', 'selectors', 'getSsr')(state),
});

const mapDispatchToProps = dispatch => ({
  activeSlideHasChanged: payload => dispatch(actions.list.activeSlideHasChanged(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  inject(stores => ({
    currentId: stores.connection.selected.id,
    currentType: stores.connection.selected.type,
    lists: stores.connection.context.columns.map(column => column.items[0]),
  }))(Lists),
);

const Container = styled.div`
  ${({ status }) => (status === 'exiting' ? 'display: none' : '')};
`;
