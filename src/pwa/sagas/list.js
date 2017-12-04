import { all, call, put, takeEvery } from 'redux-saga/effects';
import { dep } from 'worona-deps';

function* handleListRequest({ connection }) {
  const { id, route } = connection.selected;
  const { columns } = connection.context;
  const activeSlide = columns.findIndex(column =>
    column.items.find(item => item.singleId === id || item.listId === id),
  );

  if (activeSlide < 0) return;

  if (route === 'list') {
    const lists = columns.map(list => list.items[0]);
    const currentLists =
      activeSlide + 3 > lists.length
        ? lists
            .slice(activeSlide ? activeSlide - 1 : activeSlide, activeSlide + 3)
            .concat(lists.slice(0, (activeSlide + 3) % lists.length))
        : lists.slice(activeSlide ? activeSlide - 1 : activeSlide, activeSlide + 3);

    const readyLists = currentLists.map(
      ({ listId, listType }) => connection.list[listType][listId].ready,
    );

    const updateLists = currentLists.filter((_list, index) => !readyLists[index]);

    yield all(
      updateLists.map(({ listId, listType }) =>
        put(
          dep('connection', 'actions', 'listRequested')({
            listId,
            listType,
          }),
        ),
      ),
    );
  } else if (route === 'single') {
    const lists = columns.reduce((result, current) => {
      const list = current.items[0].fromList;
      if (list) result.push(list);
      return result;
    }, []);

    const updateLists = lists.reduce((result, current) => {
      const { listType, listId } = current;
      if (!connection.list[listType][listId].ready) result.push(current);
      return result;
    }, []);

    yield all(
      updateLists.map(({ listId, listType }) =>
        put(
          dep('connection', 'actions', 'listRequested')({
            listId,
            listType,
          }),
        ),
      ),
    );
  }
}

function* clientRenderWatcher(stores) {
  yield takeEvery(dep('build', 'actionTypes', 'CLIENT_RENDERED'), handleListRequest, stores);
}

export default function* listSagas(stores) {
  yield call(clientRenderWatcher, stores);
}
