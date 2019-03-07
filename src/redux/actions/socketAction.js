import * as types from '../constants/types'

export const socketConnect = (user, roomId) => {
    return({
        type: types.sLOGIN,
        user, 
        roomId
    })
}

export const socketDisconnect = () => {
    return({
        type: types.sLOGOUT
    })
}

export const socketConnectedUsers = (users) => {
    return({
        type: types.sUSERS,
        users
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