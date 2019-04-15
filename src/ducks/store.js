import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware'
// import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import tableReducer from './reducers/tableReducer'

import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(
    combineReducers({userReducer, tableReducer}), composeWithDevTools(applyMiddleware(promiseMiddleware)))