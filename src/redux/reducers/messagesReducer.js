import { sNEW_MESSAGE } from '../constants/types';

const initialState = {
    messages: []
}

export default function(state=initialState, action) {
    switch(action.type) {
        case sNEW_MESSAGE:
            return {
                messages: [...state.messages, action.message]
            }
        default:
            return state
    }
}