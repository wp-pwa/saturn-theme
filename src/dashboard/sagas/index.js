import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as deps from '../deps';
import pkgJson from '../../../package.json'; // Remove this line and enter the pkgJson.name manually.

export function* saveDefaults(action) {
  yield put(deps.actions.saveSettingsRequested({
    someValue: 'This is a value saved in the database.',
  }, {
    name: pkgJson.name,
    siteId: action.siteId, // This is optional when editing a site.
  }));
}

export default function* testSagas() {
  yield [
    takeEvery(action => action.type === deps.types.DEFAULT_SETTINGS_NEEDED
      && action.name === pkgJson.name,
      saveDefaults),
  ];
}
