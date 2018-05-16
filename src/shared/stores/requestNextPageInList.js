import { when } from 'mobx';
import { flow } from 'mobx-state-tree';

export default self => ({
  getNextPage: flow(function* getNextPage() {
    const { connection } = self.root;

    const { type, id, page } = connection.selectedColumn.items[
      connection.selectedColumn.items.length - 1
    ];

    const initialColumnIndex = connection.selectedColumn.index;

    if (!connection.list(type, id).page(page + 1).isReady) {
      self.connection.fetchListPage({ list: { type, id, page: page + 1 } });

      // Waits for the new page to be ready and then paint it.
      yield when(() => connection.list(type, id).page(page + 1).isReady);
    }

    if (initialColumnIndex !== connection.selectedColumn.index) return;

    self.connection.addItemToColumn({ item: { type, id, page: page + 1 } });
  }),
});
