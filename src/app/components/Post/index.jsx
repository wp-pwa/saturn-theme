import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { GridContainer, GridRow, GridColumn } from 'mcr-worona';
import fecha from 'fecha';
import Header from '../Header';
import Media from './Media';
import Title from './Title';
import Content from './Content';
import { selectors } from '../../deps';

import styles from './styles.css';

const Post = ({ post, isReady, media, users }) =>
  <GridContainer style={{ padding: 0 }}>
    <GridRow>
      <Header />
    </GridRow>
    <GridRow>
      {isReady &&
        <GridColumn small={{ width: 12 }} className={styles.postContent}>
          <Media media={media[post.featured_media]} />
          <Title
            title={post.title.rendered}
            author={users[post.author]}
            date={fecha.format(new Date(post.date), 'DD.MM.YYYY - hh:mm [h.]')}
          />
          <Content content={post.content.rendered} />
        </GridColumn>}
    </GridRow>
  </GridContainer>;

Post.propTypes = {
  post: PropTypes.shape({}),
  isReady: PropTypes.bool.isRequired,
  media: PropTypes.shape({}),
  users: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  post: selectors.getCurrentSingle(state),
  isReady: selectors.isCurrentSingleReady(state),
  media: selectors.getMediaEntities(state),
  users: selectors.getUsersEntities(state),
});

export default connect(mapStateToProps)(Post);
