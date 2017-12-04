import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Slider from '../../elements/Swipe';
import List from './List';

class Lists extends Component {
  static propTypes = {
    activeSlide: PropTypes.number.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    status: PropTypes.string.isRequired,
    ssr: PropTypes.bool.isRequired,
    routeChangeRequested: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.renderLists = this.renderLists.bind(this);
    this.handleOnChangeIndex = this.handleOnChangeIndex.bind(this);
  }

  handleOnChangeIndex({ index }) {
    const { routeChangeRequested, lists } = this.props;
    const { listId, listType } = lists[index];

    routeChangeRequested({
      selected: {
        listId,
        listType,
      },
      method: 'push',
    });
  }

  renderLists({ id, type }, index) {
    const { activeSlide, status, ssr } = this.props;

    if (index < activeSlide - 1 || index > activeSlide + 1) return <div key={id} />;

    if (activeSlide !== index && (ssr || /entering|exited/.test(status))) return <div key={id} />;

    return <List key={id} id={id} type={type} active={index === activeSlide} />;
  }

  render() {
    const { lists, status, activeSlide } = this.props;
    return (
      <Container status={status}>
        <Slider index={activeSlide} onChangeIndex={this.handleOnChangeIndex}>
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
  routeChangeRequested: payload =>
    dispatch(dep('connection', 'actions', 'routeChangeRequested')(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  inject(({ connection }) => {
    const { id } = connection.selected;
    const lists = connection.context.columns.map(column => column.items[0]);
    return {
      lists,
      activeSlide: lists.findIndex(({ listId }) => listId === id),
    };
  })(Lists),
);

const Container = styled.div`
  ${({ status }) => (status === 'exiting' ? 'display: none' : '')};
`;
