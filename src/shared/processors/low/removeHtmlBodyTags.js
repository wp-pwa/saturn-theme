import { Fragment } from 'react';

export default {
  test: ({ component }) => ['html', 'body'].includes(component),
  process: () => ({ component: Fragment }),
};
