import { flow, addMiddleware } from 'mobx-state-tree';
import requestsMiddleware, { filterAlreadyRequested } from './requests';

export default self =>
  flow(function* SaturnClientFlow() {
    const { connection } = self;

    addMiddleware(connection, requestsMiddleware);

    // Handles intial requests in List view.
    if (connection.selectedContext.options.bar === 'list') {
      const { rawColumns } = connection.selectedContext;
      const selectedColumnIndex = connection.selectedColumn.index;
      const previousIndex = selectedColumnIndex === 0 ? null : selectedColumnIndex - 1;
      const nextIndex =
        selectedColumnIndex === rawColumns.length - 1 ? null : selectedColumnIndex + 1;

      const neededColumns = [];

      if (previousIndex !== null) neededColumns.push(rawColumns[previousIndex]);
      if (nextIndex !== null) neededColumns.push(rawColumns[nextIndex]);

      const items = neededColumns.map(column => ({
        type: column.rawItems[0].type,
        id: column.rawItems[0].id,
        page: column.rawItems[0].page,
      }));

      filterAlreadyRequested(items, connection).forEach(item => {
        if (item.page) connection.fetchListPage(item);
        else connection.fetchEntity(item);
      });
    }

    // Request next pages.
    yield self.theme.requestFirstExtracted();

    while (true) {
      yield self.theme.requestNextPageInSingle();
    }
  });
