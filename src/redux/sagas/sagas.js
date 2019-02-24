import { all } from 'redux-saga/effects';

import { loginWatcher, registerWatcher, logoutWatcher } from './authSagas';
import authSagas from './authSagas';
import socketSagas from './socketSagas';

// export the saga watchers
export default function* rootSaga() {
    yield all([
        loginWatcher(),
        registerWatcher(),
        logoutWatcher(),
        socketSagas()
    ])
}