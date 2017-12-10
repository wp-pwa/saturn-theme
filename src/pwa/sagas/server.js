import { race, take, put, select } from 'redux-saga/effects';
import { dep } from 'worona-deps';

function* waitForList({ listType, listId, page }) {
  const LIST_SUCCEED = dep('connection', 'actionTypes', 'LIST_SUCCEED');
  const LIST_FAILED = dep('connection', 'actionTypes', 'LIST_FAILED');
  yield race({
    succeed: take(
      action =>
        action.type === LIST_SUCCEED &&
        action.listType === listType &&
        action.listId === listId &&
        action.page === page,
    ),
    failed: take(
      action =>
        action.type === LIST_FAILED &&
        action.listType === listType &&
        action.listId === listId &&
        action.page === page,
    ),
  });
}

function* waitForSingle({ singleType, singleId }) {
  const SINGLE_SUCCEED = dep('connection', 'actionTypes', 'SINGLE_SUCCEED');
  const SINGLE_FAILED = dep('connection', 'actionTypes', 'SINGLE_FAILED');
  yield race({
    succeed: take(
      action =>
        action.type === SINGLE_SUCCEED &&
        action.singleType === singleType &&
        action.singleId === singleId,
    ),
    failed: take(
      action =>
        action.type === SINGLE_FAILED &&
        action.singleType === singleType &&
        action.singleId === singleId,
    ),
  });
}

export default function* saturnServerSaga({
  selected: { singleType, singleId, listType, listId, page },
}) {
  yield take(dep('build', 'actionTypes', 'SERVER_SAGAS_INITIALIZED'));
  const routeChangeSucceed = dep('connection', 'actions', 'routeChangeSucceed');

  if (listType) {
    const menuList = (yield select(
      dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu'),
    ))
      .filter(({ type }) => type !== 'link')
      .map(list => {
        const id = list.type === 'latest' ? 'post' : parseInt(list[list.type], 10);

        if (['page'].includes(list.type)) {
          return {
            singleType: list.type,
            singleId: id,
          };
        }

        return {
          listType: list.type,
          listId: id,
          page: 1,
        };
      });
    yield put(
      routeChangeSucceed({
        selected: { listType, listId, page },
        context: {
          items: menuList,
          infinite: false,
          options: {
            bar: 'list',
            recipient: 'primary',
          },
        },
      }),
    );
    yield waitForList({ listType, listId, page });
  } else {
    yield put(
      routeChangeSucceed({
        selected: { singleType, singleId },
        context: {
          items: [
            {
              singleId,
              singleType,
            },
            {
              listId: 'post',
              listType: 'latest',
              extract: true,
            },
          ],
          options: {
            bar: 'single',
            recipient: 'secondary',
          },
        },
      }),
      // routeChangeSucceed({
      //   selected: { singleType, singleId },
      //   context: {
      //     items: [
      //       {
      //         singleId,
      //         singleType,
      //       },
      //       {
      //         singleId: 57,
      //         singleType: 'post',
      //       },
      //     ],
      //     options: {
      //       bar: 'single',
      //       recipient: 'secondary',
      //     },
      //   },
      // }),
    );
    yield waitForSingle({ singleType, singleId });
  }
}
