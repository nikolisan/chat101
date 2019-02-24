import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import flashMessageReducer from './flashMessageReducer';


export default (history) => combineReducers ({
    router: connectRouter(history),
    errors: errorReducer,
    auth: authReducer,
    flash: flashMessageReducer
});