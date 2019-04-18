import axios from "axios";
import { log } from "util";


//Action Constants

const GET_TABLES = 'GET_TABLES'
const ADD_TABLE = 'ADD_TABLE'
const CREATE_TABLE = 'CREATE_TABLE'

//Initial State

const initialState = {
    loading: false,
    tables: [],

    tableModel: false

}
//Action Creators

export function getTables() {
    return {
        type: GET_TABLES,
        payload: axios.get('/api/getTables')
    }
}
export function addTable() {
    return {
        type: ADD_TABLE,
    }
}
export function createTable(tableInfo) {
    console.log('hit')
    return {
        type: CREATE_TABLE,
        payload: axios.post('/api/createTable', tableInfo)
    }
}



//User reducer

export default function tableReducer(state=initialState, action) {
    switch(action.type) {
        case ADD_TABLE:
            return {...state, tableModel: true}
  
        default:
            return state
    }

}