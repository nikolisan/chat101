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

