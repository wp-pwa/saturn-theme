import Table from '../../components/Table';

export default {
  test: ({ component }) => component === 'table',
  process: () => ({ component: Table }),
};
