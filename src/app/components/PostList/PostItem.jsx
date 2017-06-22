import React, { PropTypes } from 'react';
import { GridRow } from 'mcr-worona';

import styles from './styles.css';

const PostItem = ({ title, image }) =>
  <GridRow
    className={styles.postItem}
    style={{
      backgroundImage: `url(${image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}
  >
    {title}
  </GridRow>;

PostItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default PostItem;
