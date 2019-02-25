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

// import * as types from '../constants/types';

// const initialState = {
//     serverStatus: 'unknown',
//   };
  
//   export default (state = initialState, action) => {
//     switch (action.type) {
//       case types.ADD_TASK:
//         return state;
//       case types.SERVER_OFF:
//         return {...state, serverStatus: 'off'};
//       case types.SERVER_ON:
//         return {...state, serverStatus: 'on'};
//       default:
//         return state;
//     }
//   };