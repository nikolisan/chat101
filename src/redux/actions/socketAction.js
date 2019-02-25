import * as types from '../constants/types'

export const socketConnect = (user) => {
    return({
        type: types.sLOGIN,
        user
    })
}

export const socketDisconnect = () => {
    return({
        type: types.sLOGOUT
    })
}

export const socketAddUser = () => {
    return({
        type: types.sADD_USER
    })
}

export const socketRemoveUser = () => {
    return({
        type: types.sREMOVE_USER
    })
}

export const socketNewMessage = (message) => {
    return({
        type: types.sNEW_MESSAGE,
        message
    })
}

export const socketSendMessage = (message) => {
    return({
        type: types.sSEND_MESSAGE,
        message
    })
}

// export const startChannel = () => ({type: types.START_CHANNEL});
// export const stopChannel = () => ({type: types.STOP_CHANNEL});

// import { createAction } from 'redux-act';

// export const socketConnect = createAction(types.sLOGIN);
// export const socketDisconnect = createAction(types.sLOGOUT);

// export const socketAddUser = createAction(types.sADD_USER);
// export const socketRemoveUser = createAction(types.sREMOVE_USER);

// export const socketNewMessage = (message) => {
//     return({
//         type: types.sNEW_MESSAGE,
//         message
//     })
// }
// export const socketSendMessage = createAction(types.sSEND_MESSAGE);

export const socketConnected = () => {
    return({
        type: types.sCONNECTED
    })
}