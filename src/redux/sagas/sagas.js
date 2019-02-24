import { all } from 'redux-saga/effects';

import { loginWatcher, registerWatcher, logoutWatcher } from './authSagas';

// export the saga watchers
export default function* rootSaga() {
    yield all([
        loginWatcher(),
        registerWatcher(),
        logoutWatcher(),
    ])
}