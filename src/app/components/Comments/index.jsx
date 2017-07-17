import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDisqusComments from 'react-disqus-comments';

import CommentsIcon from 'react-icons/lib/fa/comments-o';
import ArrowIcon from 'react-icons/lib/fa/angle-down';

import * as selectors from '../../selectors';
import * as actions from '../../actions';
import * as deps from '../../deps';

import styles from './styles.css';

const Comments = ({ article, isOpen, toggle, disqusShortname }) =>
  <div className={`${isOpen && styles.active} ${styles.commentsContainer}`}>
    <button className={styles.button} onClick={toggle}>
      <CommentsIcon className={styles.icon} size={40} />
      <div>
        {'Comentarios'}
      </div>
      <ArrowIcon className={`${styles.arrow} ${styles.icon}`} size={40} />
    </button>
    <div className={styles.comments}>
      <ReactDisqusComments
        shortname={disqusShortname}
        identifier={`${article.id} ${article.guid.rendered}`}
        title={article.title.rendered}
        url={article.link}
        onNewComment={() => article}
      />
    </div>
  </div>;

Comments.propTypes = {
  article: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  disqusShortname: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isOpen: selectors.comments.isOpen(state),
  article: deps.selectors.getCurrentSingle(state),
});

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(actions.comments.toggle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
