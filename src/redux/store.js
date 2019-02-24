import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers';
import rootSaga from './sagas/sagas';

const initialState = {}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware()
export const history = createBrowserHistory()
const logger = createLogger({
    collapsed: true
})

const store = createStore (
    rootReducer(history),
    initialState,
    composeEnhancers(
        applyMiddleware(routerMiddleware(history), sagaMiddleware, logger)
    )
)

sagaMiddleware.run(rootSaga)

export default store;