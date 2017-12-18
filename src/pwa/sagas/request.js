import { all, call, put, takeEvery } from "redux-saga/effects";
import { dep } from "worona-deps";

function* handleRequest({ connection }) {
  const { columns, column } = connection.context;

  const activeSlide = columns.indexOf(column);

  if (activeSlide < 0) return;

  const previousSlide = activeSlide === 0 ? null : activeSlide - 1;
  const nextSlide = activeSlide === columns.length - 1 ? null : activeSlide + 1;

  const neededColumns = [];
  if (previousSlide !== null) neededColumns.push(columns[previousSlide]);
  if (nextSlide !== null) neededColumns.push(columns[nextSlide]);

  const neededItems = neededColumns.map(c => {
    const { singleType, singleId, listType, listId, fromList } = c.items[0];

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
          dep("connection", "actions", "singleRequested")({
            singleId,
            singleType
          })
        );
      }

      return put(
        dep("connection", "actions", "listRequested")({
          listId,
          listType
        })
      );
    })
  );
}

function* requestSagasWatcher(stores) {
  yield takeEvery(dep("build", "actionTypes", "CLIENT_RENDERED"), handleRequest, stores);
  yield takeEvery(dep("connection", "actionTypes", "ROUTE_CHANGE_SUCCEED"), handleRequest, stores);
}

export default function* requestSagas(stores) {
  yield call(requestSagasWatcher, stores);
}
