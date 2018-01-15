export { default } from '../../pwa/sagas/server';

// import { fork, take, put, all } from 'redux-saga/effects';
// import { dep } from 'worona-deps';
// import pwaServerSagas, { waitForList } from '../../pwa/sagas/server';
//
// export default function* ampServerSagas({ selected }) {
//   yield fork(pwaServerSagas, { selected });
//   yield take(dep('build', 'actionTypes', 'SERVER_SAGAS_INITIALIZED'));
//   const listRequested = dep('connection', 'actions', 'listRequested');
//   yield put(listRequested({ listType: 'latest', listId: 'post' }));
//   // ...
//   yield all([
//     waitForList({ listType: 'latest', listId: 'post' })
//     // ...
//   ])
// }
