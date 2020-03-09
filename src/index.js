import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as toastrReducer } from 'react-redux-toastr'
import ReduxToastr from 'react-redux-toastr'

import './index.css';
import App from './App';


let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const rootReducer = combineReducers({
    toastr: toastrReducer
});
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <ReduxToastr />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
