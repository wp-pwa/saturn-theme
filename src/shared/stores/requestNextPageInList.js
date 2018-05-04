import { when } from 'mobx';
import { getEnv, flow } from 'mobx-state-tree';
import { dep } from 'worona-deps';
import * as actionTypes from '../../pwa/actionTypes';

export default self => ({
  [actionTypes.GET_NEXT_PAGE]: flow(function* getNextPage() {
    const { dispatch } = getEnv(self).store;
    const listRequested = dep('connection', 'actions', 'listRequested');
    const addItemToColumn = dep('connection', 'actions', 'addItemToColumn');
    const ADD_ITEM_TO_COLUMN = dep('connection', 'actionTypes', 'ADD_ITEM_TO_COLUMN');

    const { type, id, page } = self.connection.selectedColumn.items[
      self.connection.selectedColumn.items.length - 1
    ];

    const initialColumnIndex = self.connection.selectedColumn.index;

    if (!self.connection.list(type, id).page(page + 1).ready) {
      dispatch(listRequested({ list: { type, id, page: page + 1 } }));

      // Waits for the new page to be ready and then paint it.
      yield when(() => self.connection.list(type, id).page(page + 1).ready);
    }

    if (initialColumnIndex !== self.connection.selectedColumn.index) return;

    self.connection[ADD_ITEM_TO_COLUMN](addItemToColumn({ item: { type, id, page: page + 1 } }));
  }),
});
