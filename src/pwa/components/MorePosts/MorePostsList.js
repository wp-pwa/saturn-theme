import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MorePostsItem from './MorePostsItem';
import * as selectors from '../../selectors';

class MorePostsList extends Component {
  renderMorePostsItems = (id, index, array) => {
    const { onlyFollowing, currentPostId } = this.props;
    const isLastIndex = array.indexOf(currentPostId) === array.length - 1;

    if (
      id === currentPostId ||
      (!isLastIndex && onlyFollowing && index <= array.indexOf(currentPostId))
    )
      return null;

    return <MorePostsItem key={id} id={id} />;
  };

  render() {
    return (
      <Container>
        {this.props.postList.map(this.renderMorePostsItems)}
      </Container>
    );
  }
}

MorePostsList.propTypes = {
  onlyFollowing: PropTypes.bool.isRequired,
  currentPostId: PropTypes.number.isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const mapStateToProps = state => ({
  postList: selectors.post.getNextPostsList(state),
  currentPostId: selectors.post.getCurrentPostId(state),
});

export default connect(mapStateToProps)(MorePostsList);

const Container = styled.ul`
  height: 150px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: stretch;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-x: scroll;
  -webkit-overflow-scrolling: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
