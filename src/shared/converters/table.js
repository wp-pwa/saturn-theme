import React from 'react';
import Table from '../components/Table';

export default {
  test: ({ component }) => component === 'table',
  process: () => children => <Table>{children}</Table>,
};
