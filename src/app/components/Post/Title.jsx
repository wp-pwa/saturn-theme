/* eslint react/no-danger: 0 */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import IconClock from 'react-icons/lib/md/access-time';
import IconShare from 'react-icons/lib/md/share';

import styles from './styles.css';

const Title = ({ title, author, date, readingTime, totalShares, totalSharesReady, sharePost }) =>
  <div className={styles.postTitle}>
    <p dangerouslySetInnerHTML={{ __html: title }} className={styles.title} />
    <div>
      <Link to={`?author=${author.id}`}>
        <p className={styles.author}>
          {author.name}
        </p>
      </Link>
      <p className={styles.date}>
        {date}
      </p>
    </div>
    <div>
      <p
        className={`${styles.totalShares} ${totalSharesReady && styles.ready}`}
        onClick={sharePost}
      >
        <IconShare size={18} />
        <span>{`${totalShares} compartidos`}</span>
      </p>
      <p className={styles.readingTime}>
        <IconClock size={18} />
        <span>{`${readingTime} minutos`}</span>
      </p>
    </div>
  </div>;

Title.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({}).isRequired,
  date: PropTypes.string.isRequired,
  readingTime: PropTypes.number,
  totalShares: PropTypes.number,
  totalSharesReady: PropTypes.bool,
  sharePost: PropTypes.func,
};

export default Title;
