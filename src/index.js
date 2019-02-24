import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import './css/darkly.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store, {history} from './redux/store';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './redux/actions/authentication';


if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login'
    }
}


ReactDOM.render(
    <Provider store={store} >
        <App history={history}/>
    </Provider>
, document.getElementById('root'));

serviceWorker.unregister();
