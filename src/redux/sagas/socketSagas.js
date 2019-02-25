import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {
    socketConnect, socketDisconnect, socketAddUser, socketRemoveUser, socketNewMessage, socketSendMessage
} from '../actions/socketAction'
import * as types from '../constants/types';

function connect() {
    const socket = io('http://localhost:9000');
    return new Promise(resolve => {
        socket.on('connect', () => {
            resolve(socket);
        });
    });
}

function subscribe(socket) {
    return eventChannel(emit => {
        socket.on('NEW_MESSAGE', ({ message, from }) => {
            emit(socketNewMessage({ message, from }));
        });
        socket.on('users.login', ({ username }) => {
            emit(socketAddUser({ username }));
        });
        socket.on('users.logout', ({ username }) => {
            emit(socketRemoveUser({ username }));
        });
        socket.on('disconnect', e => {
            // TODO: handle
        });
        return () => {};
    });
}

function* read(socket) {
    const channel = yield call(subscribe, socket);
    while (true) {
        let action = yield take(channel);
        console.log('READ: ', action)
        yield put(action);
    }
}

function* write(socket) {
    while (true) {
        const { message } = yield take(types.sSEND_MESSAGE);
        socket.emit('SEND_MESSAGE', message);
    }
}

function* handleIO(socket) {
    yield fork(read, socket);
    yield fork(write, socket);
}

function* flow() {
    while (true) {
        let { user } = yield take(types.sLOGIN);
        const socket = yield call(connect);
        yield put({type: types.sCONNECTED})
        socket.emit('SET_USERNAME', { username: user.username });

        const task = yield fork(handleIO, socket);

        yield take(types.sLOGOUT);
        socket.disconnect()
        yield put({type: types.sDISCONNECTED})
        yield cancel(task);
        socket.emit('LOGOUT');
    }
}

export default function* rootSaga() {
    yield fork(flow);
}