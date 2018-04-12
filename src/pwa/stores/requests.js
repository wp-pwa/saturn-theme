import { when } from 'mobx';
import { getEnv } from 'mobx-state-tree';
import { dep } from 'worona-deps';

export default self => {
  const { dispatch } = getEnv(self).store;
  const listRequested = dep('connection', 'actions', 'listRequested');
  const addColumnToContext = dep('connection', 'actions', 'addColumnToContext');

  const requestNextPage = async () => {
    await when(
      () =>
        self.connection.selectedColumn.index >=
        self.connection.selectedContext.columns.length - 2,
    );
    const { index, columns } = self.connection.selectedContext;
    const { type, id, page } = columns[columns.length - 1].items[0].fromList;
    const nextPage = self.connection.list(type, id).page(page + 1);
    if (!nextPage.ready && !nextPage.fetching)
      dispatch(listRequested({ list: { type, id, page: page + 1 } }));
    dispatch(
      addColumnToContext({ column: [{ type, id, page: page + 1, extract: 'horizontal' }] }),
    );
    await when(() => nextPage.ready || self.connection.selectedContext.index !== index);
    requestNextPage();
  };
  requestNextPage();
}
