import React from 'react';
import { inject } from 'mobx-react';
import styles from './css/index.css';

import reducers from './reducers';
// export { default as sagas } from './sagas/client';

const Theme = ({ type, id }) => <div className={styles.red}>hi from saturn {type} {id}</div>;

export default inject(stores => ({
  type: stores.connection.selected.type,
  id: stores.connection.selected.id,
}))(Theme);
export { reducers };
