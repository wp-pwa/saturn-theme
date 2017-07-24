import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectorCreators, selectors } from '../../deps';
import { postSlider } from '../../actions';

import PostItem from './PostItem';
import Spinner from '../../elements/Spinner';

import styles from './styles.css';

class PostList extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isReady && this.props.postList.length !== nextProps.postList.length) {
      this.props.createPostSlider({ sliderLength: nextProps.postList.length });
    }
  }

  render() {
    const { posts, postList, isReady, users } = this.props;

    if (!isReady) {
      return <Spinner />;
    }

    return (
      <div className={styles.postList}>
        {postList.map((id, index) => {
          let type;

          if (!index) {
            type = 'first';
          } else if (index % 3 === 0) {
            type = 'alt';
          } else {
            type = 'normal';
          }

          return (
            <PostItem
              key={id}
              id={id}
              type={type}
              post={posts[id]}
              postList={postList}
              title={posts[id].title.rendered}
              author={users[posts[id].author]}
            />
          );
        })}
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.shape({}).isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  isReady: PropTypes.bool.isRequired,
  users: PropTypes.shape({}).isRequired,
  createPostSlider: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  posts: selectors.getPostsEntities(state),
  postList: selectorCreators.getListResults('currentList')(state),
  isReady: selectorCreators.isListReady('currentList')(state),
  users: selectors.getUsersEntities(state),
});

const mapDispatchToProps = dispatch => ({
  createPostSlider: options => dispatch(postSlider.createPostSlider(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
