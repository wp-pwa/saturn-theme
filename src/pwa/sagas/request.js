import { all, call, put, takeEvery } from 'redux-saga/effects';
import { dep } from 'worona-deps';

function* handleRequest({ connection }) {
  const { id } = connection.selected;
  const { columns } = connection.context;

  const activeSlide = columns.findIndex(column =>
    column.items.find(item => item.singleId === id || item.listId === id),
  );

  if (activeSlide < 0) return;

  const items = columns.map(list => list.items[0]);
  const currentItems =
    activeSlide + 2 > items.length
      ? items
          .slice(activeSlide ? activeSlide - 1 : activeSlide, activeSlide + 2)
          .concat(items.slice(0, (activeSlide + 2) % items.length))
      : items.slice(activeSlide ? activeSlide - 1 : activeSlide, activeSlide + 2);

  const updateItems = currentItems.filter(({ listType, listId, singleType, singleId }) => {
    if (listType) {
      const { ready, fetching } = connection.list[listType][listId];
      return !ready && !fetching;
    }

    const { ready, fetching } = connection.single[singleType][singleId];
    return !ready && !fetching;
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
