import { when } from 'mobx';
import { getEnv, flow } from 'mobx-state-tree';
import { dep } from 'worona-deps';
import * as actionTypes from '../actionTypes';

export default self => ({
  [actionTypes.GET_NEXT_PAGE]: flow(function* getNextPage() {
    const { dispatch } = getEnv(self).store;
    const listRequested = dep('connection', 'actions', 'listRequested');
    const addItemToColumn = dep('connection', 'actions', 'addItemToColumn');

    const { type, id, page } = self.connection.selectedColumn.items[
      self.connection.selectedColumn.items.length - 1
    ];

    if (!self.connection.list(type, id).page(page + 1).ready) {
      dispatch(listRequested({ list: { type, id, page: page + 1 } }));

      // Waits for the new page to be ready and then paint it.
      yield when(() => self.connection.list(type, id).page(page + 1).ready);
    }

    dispatch(addItemToColumn({ item: { type, id, page: page + 1 } }));
  }),
});
