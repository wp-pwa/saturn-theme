import { fork, spawn, select, take, put, all } from 'redux-saga/effects';
import { dep } from 'worona-deps';
import pwaServerSagas, { waitForList, waitForSingle, waitForCustom } from '../../pwa/sagas/server';
import { allShareCountWatcher, shareCountWatcher } from './share';
import * as actions from '../../pwa/actions';
import * as actionTypes from '../../pwa/actionTypes';

function* shareRequests(selected) {
  yield waitForSingle({ singleId: selected.singleId, singleType: selected.singleType });

  yield put(actions.share.allShareCountRequested({ id: selected.singleId, wpType: 'post' }));
}

export default function* ampServerSagas({ stores, selected }) {
  yield fork(pwaServerSagas, { selected });

  yield take(dep('build', 'actionTypes', 'SERVER_SAGAS_INITIALIZED'));

  if (selected.singleId) {
    yield spawn(allShareCountWatcher, stores);
    yield spawn(shareCountWatcher);
    yield fork(shareRequests, selected);

    const singleRequested = dep('connection', 'actions', 'singleRequested');
    const listRequested = dep('connection', 'actions', 'listRequested');
    const customRequested = dep('connection', 'actions', 'customRequested');

    yield put(listRequested({ listType: 'latest', listId: 'post', page: 1 }));

    const menu = (yield select(
      dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')
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
          name: 'menuCategories',
          singleType: 'category',
          params: { include: menu.category }
        })
      );
    }

    if (menu.tag) {
      yield put(
        customRequested({ name: 'menuTags', singleType: 'tags', params: { include: menu.tag } })
      );
    }

    if (menu.page) {
      yield all(
        menu.page.map(page =>
          put(singleRequested({ singleType: 'page', singleId: parseInt(page, 10) }))
        )
      );
    }

    if (menu.post) {
      yield all(
        menu.post.map(post =>
          put(singleRequested({ singleType: 'post', singleId: parseInt(post, 10) }))
        )
      );
    }

    console.log(menu.page[0]);

    yield all([
      waitForList({ listType: 'latest', listId: 'post', page: 1 }),
      waitForCustom({ name: 'menuCategories', page: 1 }),
      waitForCustom({ name: 'menuTags', page: 1 }),
      waitForSingle({ singleType: 'page', singleId: menu.page[0] }),
      take(actionTypes.ALL_SHARE_COUNT_RESOLVED)
    ]);

    console.log('end sagas');
  }
}
