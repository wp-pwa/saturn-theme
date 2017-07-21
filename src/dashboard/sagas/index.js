import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as deps from '../deps';

// Remove this line and enter the pkgJson.name manually.
export function* saveDefaults(action) {
  yield put(
    deps.actions.saveSettingsRequested({ mainColor: '#00AEEA' }, {
      name: 'saturn-app-theme-worona',
      siteId: action.siteId,
    }),
  );
}

export default function* saturnSagas() {
  yield [
    takeEvery(
      action =>
        action.type === deps.types.DEFAULT_SETTINGS_NEEDED &&
          action.name === 'saturn-app-theme-worona',
      saveDefaults,
    ),
  ];
}
