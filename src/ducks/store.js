import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware'
// import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import groupReducer from './reducers/groupReducer'

import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(
    combineReducers({userReducer, groupReducer}), composeWithDevTools(applyMiddleware(promiseMiddleware)))