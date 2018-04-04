import { fork, spawn, select, take, put, all } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import pwaServerSagas, { waitForList, waitForEntity, waitForCustom } from '../../pwa/sagas/server';
import { allShareCountWatcher, shareCountWatcher } from './share';
import * as actions from '../../pwa/actions';
import * as actionTypes from '../../pwa/actionTypes';

function* shareRequests({ type, id }) {
  yield waitForEntity({ type, id });

  yield put(actions.share.allShareCountRequested({ id, wpType: 'post' }));
}

export default function* ampServerSagas({ stores, selectedItem }) {
  yield fork(pwaServerSagas, { selectedItem });

  yield take(dep('build', 'actionTypes', 'SERVER_SAGAS_INITIALIZED'));

  if (!selectedItem.page) {
    yield spawn(allShareCountWatcher, stores);
    yield spawn(shareCountWatcher);
    yield spawn(shareRequests, selectedItem);

    const entityRequested = dep('connection', 'actions', 'entityRequested');
    const listRequested = dep('connection', 'actions', 'listRequested');
    const customRequested = dep('connection', 'actions', 'customRequested');

    yield put(listRequested({ list: { type: 'latest', id: 'post', page: 1 } }));

    const menu = (yield select(
      dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu'),
    )).reduce((result, current) => {
      if (current.type !== 'link' && current.type !== 'latest') {
        if (result[current.type]) result[current.type].push(current[current.type]);
        else result[current.type] = [current[current.type]];
      }

      return result;
    }, {});

    if (menu.category) {
      yield put(
        customRequested({
          custom: {
            name: 'menuCategories',
            type: 'category',
            page: 1,
          },
          params: { include: menu.category.join(','), per_page: 99 },
        }),
      );
    }

    if (menu.tag) {
      yield put(
        customRequested({
          custom: {
            name: 'menuTags',
            type: 'tags',
            page: 1,
          },
          params: { include: menu.tag.join(','), per_page: 99 },
        }),
      );
    }

    if (menu.page) {
      yield all(
        menu.page.map(page => put(entityRequested({ entity: { type: 'page', id: page } }))),
      );
    }

    if (menu.post) {
      yield all(
        menu.post.map(post =>
          put(entityRequested({ entity: { type: 'post', id: parseInt(post, 10) } })),
        ),
      );
    }

    yield all(
      [
        waitForList({ type: 'latest', id: 'post', page: 1 }),
        menu.category && waitForCustom({ name: 'menuCategories', page: 1 }),
        menu.tag && waitForCustom({ name: 'menuTags', page: 1 }),
        take(actionTypes.ALL_SHARE_COUNT_RESOLVED),
      ].concat(
        menu.page && menu.page.map(page => waitForEntity({ type: 'page', id: parseInt(page, 10) })),
        menu.post && menu.post.map(post => waitForEntity({ type: 'post', id: parseInt(post, 10) })),
      ),
    );
  }
}
