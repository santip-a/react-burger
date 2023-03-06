import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import {socketMiddleware} from '../middleware/middleware';
import {wsActions} from '../actions/wsAction'



const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const wsUrl = 'wss://norma.nomoreparties.space/orders';     

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

export const store = createStore(rootReducer, enhancer);
