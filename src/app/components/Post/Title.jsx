/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import IconClock from 'react-icons/lib/md/access-time';

import styles from './styles.css';

const Title = ({ title, author, date, readingTime }) =>
  <div className={styles.postTitle}>
    <p dangerouslySetInnerHTML={{ __html: title }} className={styles.title} />
    <Link to={`?author=${author.id}`}>
      <p className={styles.author}>
        {author.name}
      </p>
    </Link>
    <p className={styles.date}>
      {date}
    </p>
    <p className={styles.readingTime}>
      <IconClock size={18} />
      <span>{`${readingTime} minutos`}</span>
    </p>
  </div>;

Title.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({}).isRequired,
  date: PropTypes.string.isRequired,
  readingTime: PropTypes.number,
};

export default Title;
