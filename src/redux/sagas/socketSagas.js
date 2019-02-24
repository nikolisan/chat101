import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel, takeLatest } from 'redux-saga/effects';

import * as types from '../constants/types';

import { socketAddUser, socketRemoveUser, socketNewMessage } from '../actions/socketAction';

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
    socket.on('users.login', ({ username }) => {
      emit(socketAddUser({ username }));
    });
    socket.on('users.logout', ({ username }) => {
      emit(socketRemoveUser({ username }));
    });
    socket.on('NEW_MESSAGE', ({ message, from }) => {
      emit(socketNewMessage({message, from}));
    });
    socket.on('disconnect', e => {
      // todo: send msg disconnected to the server
    });
    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
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

    let action = yield take(types.sLOGOUT);
    socket.disconnect()
    yield put({type: types.sDISCONNECTED})
    yield cancel(task);
    socket.emit('logout');
  }
}

export default function* socketSagas() {
  yield fork(flow);
}