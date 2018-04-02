import { all, call, put, takeEvery } from 'redux-saga/effects';
import { dep } from 'worona-deps';

function* handleRequest({ connection }) {
  const { columns, selectedColumn } = connection.selectedContext;
  console.log('columns:', columns);

  const activeSlide = columns.indexOf(selectedColumn);

  if (activeSlide < 0) return;

  const previousSlide = activeSlide === 0 ? null : activeSlide - 1;
  const nextSlide = activeSlide === columns.length - 1 ? null : activeSlide + 1;

  const neededColumns = [];
  if (previousSlide !== null) neededColumns.push(columns[previousSlide]);
  if (nextSlide !== null) neededColumns.push(columns[nextSlide]);

  const neededItems = neededColumns.map(c => {
    const { type, id, page } = c.items[0];

    return {
      type,
      id,
      page,
    };
  });

  const updateItems = neededItems.filter(({ type, id, page }) => {
    if (page) {
      const { ready, fetching } = connection.list(type, id);
      return !ready && !fetching;
    }

    const { ready, fetching } = connection.entity(type, id);
    return !ready && !fetching;
  });

  yield all(
    updateItems.map(({ type, id, page }) => {
      if (page) {
        return put(
          dep('connection', 'actions', 'listRequested')({
            list: {
              type,
              id,
              page,
            },
          }),
        );
      }

      return put(
        dep('connection', 'actions', 'entityRequested')({
          entity: {
            type,
            id,
          },
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
