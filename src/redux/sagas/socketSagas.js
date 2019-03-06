import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {
    socketConnect, socketDisconnect, socketConnectedUsers, socketRemoveUser, socketNewMessage, socketSendMessage
} from '../actions/socketAction'
import * as types from '../constants/types';

function connect() {
    const socket = io(process.env.REACT_APP_BASE_URL);
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
        socket.on('users.login', (users) => {
            emit(socketConnectedUsers(users));
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