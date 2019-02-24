import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';

import * as types from '../constants/types';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// saga workers
export function* registerUserAsync(action) {
    try {
        const response = yield call(axios.post, '/api/users/register', action.user)
        action.history.push("/login")
        yield put({type: types.ADD_FLASH_MESSAGE, payload: {
            message: "Registered successfully.\nPlease login.",
            success: true
        }})
    }
    catch (err) {
        yield put({type: types.GET_ERRORS, payload: err.response.data})
        yield put({type: types.ADD_FLASH_MESSAGE, payload: {
            message: `${err.response.status} - ${err.response.statusText}`,
            success: false
        }})
    }
}

export function* loginUserAsync(action) {
    try {
        const response = yield call(axios.post, '/api/users/login', action.user)
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        yield put({type: types.SET_CURRENT_USER, payload: decoded})
    }
    catch (err) {
        console.dir(err)
        yield put({type: types.GET_ERRORS, payload: err.response.data})
    }
}

export function* logoutUserAsync(action) {
    try {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        yield put({type: types.SET_CURRENT_USER, payload: {}})
        action.history.push('/login')
    }
    catch (err) {
        console.log(err)
    }
}


// saga watchers 
export function* registerWatcher() {
    yield takeEvery(types.REGISTER_USER, registerUserAsync)
}

export function* loginWatcher() {
    yield takeEvery(types.LOGIN_USER, loginUserAsync)
}

export function* logoutWatcher() {
    yield takeEvery(types.LOGOUT_USER, logoutUserAsync)
}
