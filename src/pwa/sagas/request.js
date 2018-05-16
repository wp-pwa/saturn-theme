import { all, call, put, takeEvery } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import { waitForEntity, waitForList } from './server';

// Requests items and waits for them to resolve.
function* fetchItems(items) {
  yield all(
    items.map(({ type, id, page }) => {
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

  yield all(
    items.map(item => {
      if (item.page) {
        return waitForList(item);
      }

      return waitForEntity(item);
    }),
  );
}

// Filters out items that have already been requested.
function filterItems(items, connection) {
  return items.filter(({ type, id, page }) => {
    if (page) {
      const { isReady, isFetching } = connection.list(type, id).page(page);

      return !isReady && !isFetching;
    }

    const { isReady, isFetching } = connection.entity(type, id);
    return !isReady && !isFetching;
  });
}

// Handles requests after the CLIENT_RENDERED action.
function* handleInitialRequests({ connection }) {
  // Handles requests in List view.
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

    const filteredItems = filterItems(items, connection);

    if (filteredItems.length) yield call(fetchItems, filteredItems);
  }
}

// Handles requests after the ROUTE_CHANGE_SUCCEED action.
function* handleRequests({ connection }) {
  const selectedColumnIndex = connection.selectedColumn.index;

  // Handles requests in List view.
  if (connection.selectedContext.options.bar === 'list') {
    const { rawColumns } = connection.selectedContext;
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

    yield call(fetchItems, filterItems(items, connection));
  }
}

function* requestSagasWatcher(stores) {
  yield takeEvery(dep('build', 'actionTypes', 'CLIENT_RENDERED'), handleInitialRequests, stores);
  yield takeEvery(dep('connection', 'actionTypes', 'ROUTE_CHANGE_SUCCEED'), handleRequests, stores);
}

export default function* requestSagas(stores) {
  yield call(requestSagasWatcher, stores);
}
