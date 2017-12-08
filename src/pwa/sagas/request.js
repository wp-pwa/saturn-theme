import { all, call, put, takeEvery } from 'redux-saga/effects';
import { dep } from 'worona-deps';

function* handleRequest({ connection }) {
  const { id } = connection.selected;
  const { columns } = connection.context;

  const activeSlide = columns.findIndex(column =>
    column.items.find(item => item.singleId === id || item.listId === id),
  );

  if (activeSlide < 0) return;

  const neededColumns =
    activeSlide + 2 > columns.length
      ? columns
          .slice(activeSlide ? activeSlide - 1 : activeSlide, activeSlide + 2)
          .concat(columns.slice(0, (activeSlide + 2) % columns.length))
      : columns.slice(activeSlide ? activeSlide - 1 : activeSlide, activeSlide + 2);

  const neededItems = neededColumns.map(column => {
    const { singleType, singleId, listType, listId, fromList } = column.items[0];

    if (singleType && singleId) return { singleType, singleId };
    if (listType && listId) return { listType, listId };
    if (fromList) return { listType: fromList.listType, listId: fromList.listId };

    return {};
  });

  const updateItems = neededItems.filter(({ listType, listId, singleType, singleId }) => {
    if (singleType && singleId) {
      const { ready, fetching } = connection.single[singleType][singleId];
      return !ready && !fetching;
    }

    if (listType && listId) {
      const { ready, fetching } = connection.list[listType][listId];
      return !ready && !fetching;
    }

    return false;
  });

  yield all(
    updateItems.map(({ listId, listType, singleId, singleType }) => {
      if (singleType) {
        return put(
          dep('connection', 'actions', 'singleRequested')({
            singleId,
            singleType,
          }),
        );
      }

      return put(
        dep('connection', 'actions', 'listRequested')({
          listId,
          listType,
        }),
      );
    }),
  );
}

function* requestSagasWatcher(stores) {
  yield takeEvery(dep('build', 'actionTypes', 'CLIENT_RENDERED'), handleRequest, stores);
  yield takeEvery(dep('connection', 'actionTypes', 'ROUTE_CHANGE_SUCCEED'), handleRequest, stores);
}

export default function* requestSagas(stores) {
  yield call(requestSagasWatcher, stores);
}
