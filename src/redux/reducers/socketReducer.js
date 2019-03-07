import * as types from '../constants/types';
import { routerActions } from 'connected-react-router';

const initialState = {
    isConnected: false,
    onlineUsers: {}
}

export default function(state=initialState, action) {
    switch(action.type) {
        case types.sDISCONNECTED:
            return {
                ...state,
                isConnected: false
            }
        case types.sCONNECTED:
            return {
                ...state,
                isConnected: true
            }
        case types.sUSERS:
            return {
                onlineUsers: action.users
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