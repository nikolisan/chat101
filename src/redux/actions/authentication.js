import * as types from '../constants/types';

export const loginUser = (user) => {
    return({
        type: types.LOGIN_USER,
        user
    })
}

export const registerUser = (user, history) => {
    return({
        type: types.REGISTER_USER,
        user,
        history
    })
}

export const logoutUser = (history) => {
    return({
        type: types.LOGOUT_USER,
        history
    })
}

export const setCurrentUser = decoded => {
    return {
        type: types.SET_CURRENT_USER,
        payload: decoded
    }
}