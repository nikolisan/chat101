import { sCONNECTED, sDISCONNECTED } from '../constants/types';

const initialState = {
    isConnected: false
}

export default function(state=initialState, action) {
    switch(action.type) {
        case sDISCONNECTED:
            return {
                ...state,
                isConnected: false
            }
        case sCONNECTED:
            return {
                ...state,
                isConnected: true
            }
        default:
            return state
    }
}